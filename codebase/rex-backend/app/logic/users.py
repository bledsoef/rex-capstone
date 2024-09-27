from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.ArchivedRec import ArchivedRec
from app.models.Artist import Artist
from app.models.CompletedRec import CompletedRec
from app.models.Genre import Genre
from app.models.PendingRec import PendingRec
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.Rec import Rec
from app.models.Review import Review
from app.models.ReviewComment import ReviewComment
from app.models.Song import Song
from app.models.SongArtist import SongArtist
from app.models.SongListen import SongListen
from app.models.User import User
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
from app.models.UserLikedAlbum import UserLikedAlbum
from app.models.UserLikedSong import UserLikedSong
from datetime import datetime
def create_new_user(db: Session, user_data):
    try:
        user = db.query(User).filter(User.email == user_data["email"]).first()
        if user:
            return False
        max_id = db.query(func.max(User.id)).scalar()
        new_user = User(
            id=max_id+1,
            username=user_data["username"], 
            email=user_data["email"], 
            first_name="", 
            last_name="", 
            created_at=datetime.now(), 
            is_artist=False,
            account_type="free")
        db.add(new_user)
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False

def get_user(db: Session, email):
    user = db.query(User).filter(User.email == email).first()
    return user.__dict__