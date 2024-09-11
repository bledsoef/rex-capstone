from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Playlist import Playlist
from app.models.Song import Song

class PlaylistSong(Base):
    __tablename__ = 'playlist_songs'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    playlist_id = Column(Integer, ForeignKey('playlists.id'))
    
    playlist: Mapped["Playlist"] = relationship(back_populates="songs")
    song: Mapped["Song"] = relationship(back_populates="playlist_songs")