from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Artist import Artist
from app.models.Genre import Genre
from app.models.Album import Album
from app.models.Rec import Rec
from app.models.UserLikedSong import UserLikedSong
from app.models.AlbumArtist import AlbumArtist
from app.models.SongArtist import SongArtist
from app.models.PlaylistSong import PlaylistSong

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
    
    genre: Mapped["Genre"] = relationship(back_populates="songs")
    artist: Mapped["Artist"] = relationship(back_populates="songs")
    album: Mapped["Album"] = relationship(back_populates="songs")
    recs: Mapped[List["Rec"]] = relationship(back_populates="song")
    liked_by_users: Mapped[List["UserLikedSong"]] = relationship(back_populates="song")
    album_artists: Mapped[List["AlbumArtist"]] = relationship(back_populates="song")
    song_artists: Mapped[List["SongArtist"]] = relationship(back_populates="song")
    playlist_songs: Mapped[List["PlaylistSong"]] = relationship(back_populates="song")

