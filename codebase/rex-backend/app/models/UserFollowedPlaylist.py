from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class UserFollowedPlaylist(Base):
    __tablename__ = 'users_followed_playlists'
    
    id = Column(Integer, primary_key=True)
    playlist_id = Column(Integer, ForeignKey('playlists.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    
    playlist = relationship("Playlist", back_populates="followers")
    user = relationship("User", back_populates="followed_playlists")