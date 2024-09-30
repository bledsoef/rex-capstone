from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship
from database.config import Base

class Artist(Base):
    __tablename__ = 'artists'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre_id = Column(String, ForeignKey('genres.id'))
    bio = Column(String)
    
    recs = relationship("Rec", backref="artist")
    albums = relationship("Album", backref="artist")
    songs = relationship("Song", backref="artist")
    album_artists = relationship("AlbumArtist", backref="artist")
    song_artists = relationship("SongArtist", backref="artist")

