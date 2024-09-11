from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Genre import Genre
from app.models.Rec import Rec
from app.models.Album import Album
from app.models.Song import Song
from app.models.AlbumArtist import AlbumArtist
from app.models.SongArtist import SongArtist

class Artist(Base):
    __tablename__ = 'artists'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre_id = Column(String, ForeignKey('genres.id'))
    bio = Column(String)
    image_url = Column(String)
    
    genre: Mapped["Genre"] = relationship(back_populates="artists")
    recs: Mapped[List["Rec"]] = relationship(back_populates="artist")
    albums: Mapped[List["Album"]] = relationship(back_populates="artist")
    songs: Mapped[List["Song"]] = relationship(back_populates="artist")
    album_artists: Mapped[List["AlbumArtist"]] = relationship(back_populates="artist")
    song_artists: Mapped[List["SongArtist"]] = relationship(back_populates="artist")

