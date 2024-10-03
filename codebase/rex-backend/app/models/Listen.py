from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Listen(Base):
    __tablename__ = 'listens'
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    start_timestamp = Column(Date)
    end_timestamp = Column(Date)
    
    song_listen = Column(Integer, ForeignKey("song_listens.id"), nullable=True)

    listened_on = Column(Date)