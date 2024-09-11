from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class SongArtist(Base):
    __tablename__ = 'song_artists'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    artist_id = Column(Integer, ForeignKey('artists.id'))
    is_primary_artist = Column(Boolean)  # collaborator or main artist
    is_secondary_artist = Column(Boolean)  # features
    
    song = relationship("Song", back_populates="song_artists")
    artist = relationship("Artist", back_populates="song_artists")


