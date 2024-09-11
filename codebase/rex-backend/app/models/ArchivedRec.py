from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Rec import Rec

class ArchivedRec(Base):
    __tablename__ = 'archived_recs'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    updated = Column(Date)
    
    rec: Mapped["Rec"] = relationship(back_populates="archived_recs")