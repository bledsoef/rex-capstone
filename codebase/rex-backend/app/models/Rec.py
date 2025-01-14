from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
class Rec(Base):
    __tablename__ = 'recs'
    
    id = Column(Integer, primary_key=True)
    body = Column(String, nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id'))
    recipient_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    created_at = Column(Date)
    song_id = Column(Integer, ForeignKey('songs.id'), nullable=True, default=None)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=True, default=None)
    album_id = Column(Integer, ForeignKey('albums.id'), nullable=True, default=None)
    playlist_id = Column(Integer, ForeignKey('playlists.id'), nullable=True, default=None)
    is_post = Column(Boolean, default=False)
    post_rec_id = Column(Integer, ForeignKey('recs.id'), nullable=True, default=None)
    status = Column(String, nullable=True)

    reviews = relationship("Review", backref="rec")
    comments = relationship("RecComment", backref="rec")
