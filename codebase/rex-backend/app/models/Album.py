from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Album(Base):
    __tablename__ = 'albums'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    release_date = Column(Date)
    
    recs = relationship("Rec", backref="album")
    songs = relationship("Song", backref="album")
    liked_by_users = relationship("UserLikedAlbum", backref="album")