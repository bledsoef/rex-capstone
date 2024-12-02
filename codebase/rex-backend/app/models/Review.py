from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
class Review(Base):
    __tablename__ = 'reviews'
    
    id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    justification = Column(Integer)
    reviewed_at = Column(Date)
    