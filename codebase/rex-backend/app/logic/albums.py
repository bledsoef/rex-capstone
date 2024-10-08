from sqlalchemy.orm import Session, aliased
from app.logic.utils import obj_list_to_dict
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.ArchivedRec import ArchivedRec
from app.models.Artist import Artist
from app.models.CompletedRec import CompletedRec
from app.models.Genre import Genre
from app.models.PendingRec import PendingRec
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.PlaylistCreator import PlaylistCreator
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

def get_user_liked_albums(db: Session, user_id):
    liked_albums = db.query(UserLikedAlbum, Album).join(Album, Album.id==UserLikedAlbum.album_id).filter(UserLikedAlbum.user_id == user_id)
    return [album.__dict__ for liked_album, album in liked_albums]

def like_song(db: Session, song_id, user_id) -> str:
    liked_album = UserLikedAlbum(user_id=user_id, song_id=song_id)
    db.add(liked_album)
    db.commit()

def unlike_album(db: Session, song_id, user_id) -> str:
    unliked_album = db.query(UserLikedAlbum).filter_by(song_id=song_id, user_id=user_id)
    db.delete(unliked_album)
    db.commit()

def create_album(db: Session, album_data):
    new_album = Album(**album_data)
    db.add(new_album)
    db.commit()

def delete_album(db: Session, album_id):
    deleted_album = db.query(Album).filter_by(album_id)
    db.delete(deleted_album)
    db.commit()