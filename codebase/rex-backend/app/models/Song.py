from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Song(Base):
    __tablename__ = 'songs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=True)
    album_id = Column(Integer, ForeignKey('albums.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    duration = Column(Integer)
    release_date = Column(Date)
    popularity = Column(Integer)
    image_url = Column(String)
    audio_url = Column(String)
    
    recs = relationship("Rec", backref="song")
    liked_by_users = relationship("UserLikedSong", backref="song")
    album_artists = relationship("AlbumArtist", backref="song")
    song_artists = relationship("SongArtist", backref="song")
    playlist_songs = relationship("PlaylistSong", backref="song")

