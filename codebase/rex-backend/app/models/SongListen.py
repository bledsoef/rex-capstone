from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Song import Song
from app.models.User import User

class SongListen(Base):
    __tablename__ = 'song_listens'
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    listened_on = Column(Date)

    user: Mapped["User"] = relationship(back_populates="users")
    song: Mapped["Song"] = relationship(back_populates="song_listens")
