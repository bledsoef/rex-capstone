from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Connection(Base):
    __tablename__ = 'connections'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    friend_id = Column(Integer, ForeignKey('users.id'))
    time_connected = Column(Date)
    
    song_listen = Column(Integer, ForeignKey("song_listens.id"), nullable=True)

    listened_on = Column(Date)

    user = relationship("User", foreign_keys=[user_id])
    friend = relationship("User", foreign_keys=[friend_id])