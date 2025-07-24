from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.audio import AudioRecord
from models.user import User
from utils.auth import create_access_token
from utils.gemini import analyze_audio_with_gemini
from fastapi.security import OAuth2PasswordBearer
import shutil, os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login")
router = APIRouter()

UPLOAD_DIR = "audio_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # JWT token'dan kullanıcıyı bul
    from jose import jwt, JWTError
    from utils.auth import SECRET_KEY, ALGORITHM
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/upload")
def upload_audio(file: UploadFile = File(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    risk_score, analysis = analyze_audio_with_gemini(file_location)
    audio_record = AudioRecord(
        user_id=current_user.id,
        filename=file.filename,
        risk_score=risk_score,
        analysis=analysis
    )
    db.add(audio_record)
    db.commit()
    db.refresh(audio_record)
    return {"risk_score": risk_score, "analysis": analysis, "audio_id": audio_record.id} 