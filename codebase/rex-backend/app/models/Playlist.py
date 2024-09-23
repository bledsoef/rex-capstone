from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Playlist(Base):
    __tablename__ = 'playlists'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    created_by = Column(Integer)
    updated_at = Column(Date)
    image_url = Column(String)

    recs = relationship("Rec", backref="playlist")