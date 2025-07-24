from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.audio import AudioRecord
from models.user import User
from fastapi.security import OAuth2PasswordBearer
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login")
router = APIRouter()

UPLOAD_DIR = "audio_uploads"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
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

@router.get("/history")
def get_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    records = db.query(AudioRecord).filter(AudioRecord.user_id == current_user.id).all()
    return [
        {
            "id": r.id,
            "filename": r.filename,
            "upload_time": r.upload_time,
            "risk_score": r.risk_score,
            "analysis": r.analysis
        } for r in records
    ]

@router.delete("/delete/{audio_id}")
def delete_audio(audio_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    record = db.query(AudioRecord).filter(AudioRecord.id == audio_id, AudioRecord.user_id == current_user.id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    file_path = os.path.join(UPLOAD_DIR, record.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    db.delete(record)
    db.commit()
    return {"detail": "Deleted"} 