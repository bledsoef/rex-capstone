from sqlalchemy.orm import Session, aliased
from app.models.Song import Song
from app.models.SongListen import SongListen
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
