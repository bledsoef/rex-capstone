from sqlalchemy.orm import Session, aliased
from app.models.Song import Song
from app.models.SongListen import SongListen
from app.models.UserLikedSong import UserLikedSong
from datetime import datetime

def upload_new_song(db: Session, song_data):
    new_song = Song(**song_data)
    db.add(new_song)
    db.commit()

def play_song(db: Session, song_id, user_id) -> str:
    # may not be used if we pass in the song url whenever we populate songs in search, playlists, etc.
    song: Song = db.query(Song).filter(Song.id == song_id).first().__dict__
    song_listen: SongListen = SongListen(user_id=user_id, song_id=song_id, listened_on=datetime.now())
    db.add(song_listen)
    db.commit()
    return song.audio_url

def like_song(db: Session, song_id, user_id) -> str:
    liked_song = UserLikedSong(user_id=user_id, song_id=song_id)
    db.add(liked_song)
    db.commit()

def unlike_song(db: Session, song_id, user_id) -> str:
    unliked_song = db.query(UserLikedSong).filter_by(song_id=song_id, user_id=user_id)
    db.delete(unliked_song)
    db.commit()

def get_user_liked_songs(db: Session, user_id):
    liked_songs = db.query(UserLikedSong).filter_by(user_id=user_id).order_by(UserLikedSong.liked_at)
    return liked_songs

def check_status_of_song(db: Session, song_id, user_id, rec_creation: datetime):
    listened_song: SongListen = db.query(SongListen).filter_by(song_id=song_id, user_id=user_id).first()
    if not listened_song:
        return {"listened_to": False}

    return {"listened_to": True, "last_listened_to": listened_song.listened_on}