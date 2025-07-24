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

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="supersecret")

static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")
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
@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        return RedirectResponse("/", status_code=302)
    records = db.query(AudioRecord).filter(AudioRecord.user_id == user.id).all()
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
    risk_score, analysis = analyze_audio_with_gemini(file_location)
    audio_record = AudioRecord(user_id=user.id, filename=file.filename, risk_score=risk_score, analysis=analysis)
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