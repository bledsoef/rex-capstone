from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Rec import Rec
from app.models.UserLikedSong import UserLikedSong
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
class User(Base):
    __tablename__ = 'users'
    
    username = Column(String, primary_key=True)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    created_at = Column(Date)
    is_artist = Column(Boolean)
    account_type = Column(String)
    
    sent_recs: Mapped[List["Rec"]] = relationship(foreign_keys=[Rec.sender_id], back_populates="sender")
    received_recs: Mapped[List["Rec"]] = relationship(foreign_keys=[Rec.recipient_id], back_populates="recipient")
    liked_songs: Mapped[List["UserLikedSong"]] = relationship(back_populates="user")
    followed_playlists: Mapped[List["UserFollowedPlaylist"]] = relationship(back_populates="user")