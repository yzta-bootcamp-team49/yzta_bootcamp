from fastapi import FastAPI, Request, Depends, Form, UploadFile, File, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.user import User
from models.audio import AudioRecord
from utils.auth import get_password_hash, verify_password, create_access_token
from utils.gemini import analyze_audio_with_gemini
import shutil, os
from starlette.middleware.sessions import SessionMiddleware
from utils.alzheimer_model import predict_alzheimer_from_audio
import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="supersecret")

static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")
audio_dir = os.path.join(os.path.dirname(__file__), "audio_uploads")
app.mount("/audio_uploads", StaticFiles(directory=audio_dir), name="audio_uploads")
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "templates"))
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "audio_uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Giriş sayfası
@app.get("/", response_class=HTMLResponse)
def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Kayıt sayfası
@app.get("/register", response_class=HTMLResponse)
def register_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

# Kayıt işlemi
@app.post("/register")
def register(request: Request, first_name: str = Form(...), last_name: str = Form(...), email: str = Form(...), phone: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        return templates.TemplateResponse("register.html", {"request": request, "error": "Email already registered"})
    hashed_password = get_password_hash(password)
    db_user = User(first_name=first_name, last_name=last_name, email=email, phone=phone, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return RedirectResponse("/", status_code=302)

# Giriş işlemi
@app.post("/login")
def login(request: Request, email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return templates.TemplateResponse("login.html", {"request": request, "error": "Incorrect email or password"})
    request.session["user_id"] = user.id
    return RedirectResponse("/dashboard", status_code=302)

# Çıkış
@app.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse("/", status_code=302)

# Kullanıcıyı session'dan bul

def get_current_user(request: Request, db: Session):
    user_id = request.session.get("user_id")
    if not user_id:
        return None
    return db.query(User).filter(User.id == user_id).first()

# Ana panel
from datetime import timezone
import pytz

@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        return RedirectResponse("/", status_code=302)

    records = db.query(AudioRecord).filter(AudioRecord.user_id == user.id).all()

    # Türkiye saatine çevir
    turkey_tz = pytz.timezone("Europe/Istanbul")
    for r in records:
        if r.upload_time:
            if r.upload_time.tzinfo is None:
                r.upload_time = pytz.utc.localize(r.upload_time)  # Naive datetime ise UTC kabul edip zaman ver
            r.upload_time = r.upload_time.astimezone(turkey_tz)

    return templates.TemplateResponse("dashboard.html", {"request": request, "user": user, "records": records})


# Ses yükleme ve analiz
@app.post("/upload_audio")
def upload_audio(request: Request, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        return RedirectResponse("/", status_code=302)

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        model_pred, model_proba = predict_alzheimer_from_audio(file_location)
        sinif_etiketleri = {0: "Alzheimer Hastalığı", 1: "Sağlıklı", 2: "Hafif Bilişsel Bozukluk"}
        etiket = sinif_etiketleri.get(model_pred, "Bilinmiyor")

        risk_score, analysis = analyze_audio_with_gemini(file_location, etiket, model_proba)

        # Gemini'den sadece text kısmını al
        if isinstance(analysis, dict):
            try:
                analysis_text = analysis['candidates'][0]['content']['parts'][0]['text']
            except Exception:
                analysis_text = "Analiz verisi işlenemedi."
        else:
            analysis_text = str(analysis)

        # Model sonucu ve güven oranını sonuna ekle
        model_result = f"\n Güven Oranı: {model_proba:.2f}"
        full_analysis = analysis_text + model_result

    except Exception as e:
        full_analysis = f"Model çalıştırılamadı: {e}"
        risk_score = "Bilinmiyor"

    # Veritabanına kaydet
    audio_record = AudioRecord(
        user_id=user.id,
        filename=file.filename,
        risk_score=risk_score,
        analysis=full_analysis
    )
    db.add(audio_record)
    db.commit()
    db.refresh(audio_record)

    return RedirectResponse("/dashboard", status_code=302)


# Geçmişten silme
@app.get("/delete/{audio_id}")
def delete_audio(request: Request, audio_id: int, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        return RedirectResponse("/", status_code=302)
    record = db.query(AudioRecord).filter(AudioRecord.id == audio_id, AudioRecord.user_id == user.id).first()
    if record:
        file_path = os.path.join(UPLOAD_DIR, record.filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        db.delete(record)
        db.commit()
    return RedirectResponse("/dashboard", status_code=302) 