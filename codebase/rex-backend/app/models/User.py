from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List
from app.models.Rec import Rec

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    created_at = Column(Date)
    is_artist = Column(Boolean)
    account_type = Column(String)
    
    sent_recs = relationship("Rec", foreign_keys=[Rec.sender_id], backref="sender")
    received_recs = relationship("Rec", foreign_keys=[Rec.recipient_id], backref="recipient")
    liked_songs = relationship("UserLikedSong", backref="user")
    liked_albums = relationship("UserLikedAlbum", backref="user")
    followed_playlists = relationship("UserFollowedPlaylist", backref="user")