from sqlalchemy.orm import Session, aliased
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

def get_songs_for_album(db: Session, album_id):
    songs = db.query(Song).filter_by(album_id = album_id).order_by(Song.index)
    album = db.query(Album).filter_by(id = album_id).first()
    artist = db.query(Artist).filter_by(id = album.artist_id).first()
    return {"album": album.__dict__, "songs": [song.__dict__ for song in songs], "artist": artist.__dict__}
