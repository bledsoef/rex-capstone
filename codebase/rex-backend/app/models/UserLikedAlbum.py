from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class UserLikedAlbum(Base):
    __tablename__ = 'users_liked_albums'
    
    id = Column(Integer, primary_key=True)
    album_id = Column(Integer, ForeignKey('albums.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    liked_at = Column(Date)