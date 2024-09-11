from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base

class PendingRec(Base):
    __tablename__ = 'pending_recs'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    updated = Column(Date)
    
    rec = relationship("Rec", back_populates="pending_recs")