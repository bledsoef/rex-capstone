from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Song import Song
from app.models.Artist import Artist


class AlbumArtist(Base):
    __tablename__ = 'album_artists'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    artist_id = Column(Integer, ForeignKey('artists.id'))
    
    song: Mapped["Song"] = relationship(back_populates="album_artists")
    artist: Mapped["Artist"] = relationship(back_populates="album_artists")