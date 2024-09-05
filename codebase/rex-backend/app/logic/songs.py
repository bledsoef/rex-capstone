from sqlalchemy.orm import Session, aliased
from app.models.models import Song, SongArtist
from datetime import datetime

def upload_new_song(db: Session, song_data):
    new_song = Song(**song_data)
    db.add(new_song)
    db.commit()

def play_song(db: Session, song_id):
    # may not be used if we pass in the song url whenever we populate songs in search, playlists, etc.
    song = db.query(Song).filter(Song.id == song_id).first().__dict__
    return song
