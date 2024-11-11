from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Playlist(Base):
    __tablename__ = 'playlists'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    updated_at = Column(Date, nullable=True)
    has_image = Column(Boolean, nullable=True, default=False)

    recs = relationship("Rec", backref="playlist")
    playlist_creators = relationship("PlaylistCreator", backref="playlist") 
