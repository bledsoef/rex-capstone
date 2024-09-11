from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Song import Song
from app.models.User import User
class UserLikedSong(Base):
    __tablename__ = 'users_liked_songs'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    liked_at = Column(Date)
    
    song: Mapped["Song"] = relationship(back_populates="liked_by_users")
    user: Mapped["User"] = relationship(back_populates="liked_songs")
