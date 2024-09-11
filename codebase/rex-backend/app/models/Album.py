from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Album(Base):
    __tablename__ = 'albums'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    release_date = Column(Date)
    image_url = Column(String)
    
    artist = relationship("Artist", back_populates="albums")
    genre = relationship("Genre", back_populates="albums")
    recs = relationship("Rec", back_populates="album")
    songs = relationship("Song", back_populates="album")
    liked_by_users = relationship("UserLikedSong", back_populates="album")