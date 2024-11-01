from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Song(Base):
    __tablename__ = 'songs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    album_id = Column(Integer, ForeignKey('albums.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    duration = Column(Integer)
    release_date = Column(Date)
    popularity = Column(Integer)
    index = Column(Integer)
    
    recs = relationship("Rec", backref="song")
    liked_by_users = relationship("UserLikedSong", backref="song")
    song_artists = relationship("SongArtist", backref="song")
    playlist_songs = relationship("PlaylistSong", backref="song")

