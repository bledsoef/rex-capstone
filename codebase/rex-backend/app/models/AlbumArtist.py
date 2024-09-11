from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List


class AlbumArtist(Base):
    __tablename__ = 'album_artists'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    artist_id = Column(Integer, ForeignKey('artists.id'))
    
    song = relationship("Song", back_populates="album_artists")
    artist = relationship("Artist", back_populates="album_artists")