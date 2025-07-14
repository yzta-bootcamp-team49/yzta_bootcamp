from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from database.db import Base
from datetime import datetime

class AudioRecord(Base):
    __tablename__ = "audio_records"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String, nullable=False)
    upload_time = Column(DateTime, default=datetime.utcnow)
    risk_score = Column(String, nullable=True)
    analysis = Column(Text, nullable=True)
    user = relationship("User") 