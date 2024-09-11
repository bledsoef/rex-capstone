from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
class Rec(Base):
    __tablename__ = 'recs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String, nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id'))
    recipient_id = Column(Integer, ForeignKey('users.id'))
    status = Column(String)
    created_at = Column(Date)
    song_id = Column(Integer, ForeignKey('songs.id'), nullable=True)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=True)
    album_id = Column(Integer, ForeignKey('albums.id'), nullable=True)
    is_post = Column(Boolean, default=False)
    
    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_recs")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_recs")
    song = relationship("Song", back_populates="recs")
    artist = relationship("Artist", back_populates="recs")
    album = relationship("Album", back_populates="recs")
    reviews = relationship("Review", back_populates="rec")
    accepted_recs = relationship("AcceptedRec", back_populates="rec")
    completed_recs = relationship("CompletedRec", back_populates="rec")
    archived_recs = relationship("ArchivedRec", back_populates="rec")
