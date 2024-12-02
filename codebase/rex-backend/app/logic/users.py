from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.Artist import Artist
from app.models.Connection import Connection
from app.models.Genre import Genre
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.PlaylistCreator import PlaylistCreator
from app.models.Rec import Rec
from app.models.Review import Review
from app.models.RecComment import RecComment
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

        max_id = db.query(func.max(Playlist.id)).scalar()
        liked_songs = Playlist(
            id=max_id+1,
            title="My Liked Songs",
            updated_at=None)
        db.add(liked_songs)
        
        max_id = db.query(func.max(PlaylistCreator.id)).scalar()
        playlist_creator = PlaylistCreator(
            id=max_id,
            user_id=user.id,
            playlist_id=liked_songs.id
            )

        db.add(playlist_creator)
        db.commit()
        return True
    except Exception as e:
        print(e)
        return False

def get_user(db: Session, email):
    user = db.query(User).filter(User.email == email).first()
    return user.__dict__

def get_network(db: Session, user_id):
    connections = db.query(Connection).filter_by(user_id=user_id).all()
    network = [connection.friend.__dict__ for connection in connections]
    print(network)
    return network