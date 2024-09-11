from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.ReviewComment import ReviewComment
from app.models.User import User
from app.models.Song import Song
from app.models.Artist import Artist
from app.models.Album import Album
from app.models.Review import Review
from app.models.AcceptedRec import AcceptedRec
from app.models.CompletedRec import CompletedRec
from app.models.ArchivedRec import ArchivedRec
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
    
    sender: Mapped["User"] = relationship(foreign_keys=[sender_id], back_populates="sent_recs")
    recipient: Mapped["User"] = relationship(foreign_keys=[recipient_id], back_populates="received_recs")
    song: Mapped["Song"] = relationship(back_populates="recs")
    artist: Mapped["Artist"] = relationship(back_populates="recs")
    album: Mapped["Album"] = relationship(back_populates="recs")
    reviews: Mapped[List["Review"]] = relationship(back_populates="rec")
    accepted_recs: Mapped[List["AcceptedRec"]] = relationship(back_populates="rec")
    completed_recs: Mapped[List["CompletedRec"]] = relationship(back_populates="rec")
    archived_recs: Mapped[List["ArchivedRec"]] = relationship(back_populates="rec")
