from sqlalchemy.orm import Session, aliased
from app.models.UserLikedAlbum import UserLikedAlbum
from app.models.Album import Album
from datetime import datetime

def get_liked_albums(db: Session, user_id):
    liked_albums = db.query(UserLikedAlbum).filter_by(user_id)
    return liked_albums

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