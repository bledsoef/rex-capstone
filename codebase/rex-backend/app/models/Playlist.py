from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.PlaylistSong import PlaylistSong
from app.models.UserFollowedPlaylist import UserFollowedPlaylist

class Playlist(Base):
    __tablename__ = 'playlists'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    created_by = Column(Integer)
    updated_at = Column(Date)
    image_url = Column(String)
    
    songs: Mapped[List["PlaylistSong"]] = relationship(back_populates="playlist")
    followers: Mapped[List["UserFollowedPlaylist"]] = relationship(back_populates="playlist")