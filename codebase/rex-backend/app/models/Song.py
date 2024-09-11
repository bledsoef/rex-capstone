from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Song(Base):
    __tablename__ = 'songs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    album_id = Column(Integer, ForeignKey('albums.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    duration = Column(Integer)
    release_data = Column(Date)
    popularity = Column(Integer)
    image_url = Column(String)
    audio_url = Column(String)
    
    genre = relationship("Genre", back_populates="songs")
    artist = relationship("Artist", back_populates="songs")
    album = relationship("Album", back_populates="songs")
    recs = relationship("Rec", back_populates="song")
    liked_by_users = relationship("UserLikedSong", back_populates="song")
    album_artists = relationship("AlbumArtist", back_populates="song")
    song_artists = relationship("SongArtist", back_populates="song")
    playlist_songs = relationship("PlaylistSong", back_populates="song")

