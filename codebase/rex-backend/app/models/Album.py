from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Rec import Rec
from app.models.Genre import Genre
from app.models.Artist import Artist
from app.models.Song import Song
from app.models.UserLikedAlbum import UserLikedAlbum

class Album(Base):
    __tablename__ = 'albums'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    release_date = Column(Date)
    image_url = Column(String)
    
    artist: Mapped["Artist"] = relationship(back_populates="albums")
    genre: Mapped["Genre"] = relationship(back_populates="albums")
    recs: Mapped[List["Rec"]] = relationship(back_populates="album")
    songs: Mapped[List["Song"]] = relationship(back_populates="album")
    liked_by_users: Mapped[List["UserLikedAlbum"]] = relationship(back_populates="album")