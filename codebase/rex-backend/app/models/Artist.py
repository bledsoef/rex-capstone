from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship
from database.config import Base

class Artist(Base):
    __tablename__ = 'artists'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre_id = Column(String, ForeignKey('genres.id'))
    bio = Column(String)
    image_url = Column(String)
    
    genre = relationship("Genre", back_populates="artists")
    recs = relationship("Rec", back_populates="artist")
    albums = relationship("Album", back_populates="artist")
    songs = relationship("Song", back_populates="artist")
    album_artists = relationship("AlbumArtist", back_populates="artist")
    song_artists = relationship("SongArtist", back_populates="artist")

