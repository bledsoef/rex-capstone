from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class PlaylistCreator(Base):
    __tablename__ = 'playlist_creators'
    
    id = Column(Integer, primary_key=True)
    playlist_id = Column(Integer, ForeignKey('playlists.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
