from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
class Genre(Base):
    __tablename__ = 'genres'
    
    id = Column(String, primary_key=True)