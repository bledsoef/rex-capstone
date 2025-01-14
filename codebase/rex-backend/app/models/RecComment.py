from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class RecComment(Base):
    __tablename__ = 'rec_comments'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    comment = Column(String)
    creator_id = Column(Integer, ForeignKey('users.id'))
    commented_at = Column(Date)
    