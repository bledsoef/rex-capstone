from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, delete
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.Artist import Artist
from app.models.Connection import Connection
from app.models.Genre import Genre
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.PlaylistCreator import PlaylistCreator
from app.models.Listen import Listen
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

import os
from dotenv import load_dotenv

load_dotenv()

LISTEN_DURATION_THRESHOLD = os.getenv('LISTEN_DURATION_THRESHOLD')

def upload_new_song(db: Session, song_data):
    new_song = Song(**song_data)
    db.add(new_song)
    db.commit()

def play_song(db: Session, song_data) -> str:
    prev_session_id = song_data["prev_session_id"]
    prev_timestamp = song_data["prev_timestamp"]
    prev_song_id = song_data["prev_song_id"]
    user_id = song_data["user_id"] 
    if prev_session_id:
        # check if there is a hanging listen
        # if there is populate it with the proper end timestamp
        # call check_is_listened
        listen_entry = db.query(Listen).filter_by(
            song_id=prev_song_id,
            user_id=user_id,
            session_id=prev_session_id, 
            end_timestamp = None
        ).first()
        if listen_entry:
            listen_entry.end_timestamp = prev_timestamp // 1000
            db.commit()
            check_is_listened(db, prev_song_id, user_id, prev_session_id)

    played_song_id = db.query(func.max(Listen.id)).scalar()
    if played_song_id:
        played_song_id += 1
    else:
        played_song_id = 1
    new_listen = Listen(
        id=played_song_id,
        song_id=song_data["song_id"],
        user_id=user_id,
        start_timestamp=0,
        session_id=song_data["session_id"]) 
    db.add(new_listen)
    db.commit()

def resume_song(db: Session, song_data) -> str:
    played_song_id = db.query(func.max(Listen.id)).scalar()
    if played_song_id:
        played_song_id += 1
    else:
        played_song_id = 1
    new_listen = Listen(
        id=played_song_id,
        song_id=song_data["song_id"],
        user_id=song_data["user_id"],
        start_timestamp= song_data["timestamp"] // 1000,
        session_id=song_data["session_id"]) 
    db.add(new_listen)
    db.commit()

def pause_song(db: Session, song_data) -> str:
    listen_entry = db.query(Listen).filter_by(
        song_id=song_data["song_id"],
        user_id=song_data["user_id"],
        session_id=song_data["session_id"], 
        end_timestamp = None
    ).first()
    listen_entry.end_timestamp = song_data["timestamp"] // 1000
    db.commit()
    

def check_is_listened(db: Session, song_id, user_id, session_id):
    listen_time = (
        db.query(func.sum(Listen.end_timestamp - Listen.start_timestamp))
        .filter(Listen.song_id == song_id, Listen.user_id == user_id, Listen.session_id == session_id)
    ).scalar()
    
    if listen_time >= LISTEN_DURATION_THRESHOLD:
        statement = delete(Listen).where(Listen.song_id == song_id, Listen.user_id == user_id, session_id == session_id)
        db.execute(statement)
        
        song_listen_id = db.query(func.max(SongListen.id)).scalar()
        new_song_listen = SongListen(
            id=song_listen_id, 
            song_id=song_id,
            user_id=user_id,
            listened_on=datetime.now()
        )
        db.add(new_song_listen)
        db.commit()

def previous_song(db: Session, song_id, user_id):
    pass

def next_song(db: Session, song_id, user_id):
    pass

def end_song(db: Session, song_id, user_id) -> str:
    # may not be used if we pass in the song url whenever we populate songs in search, playlists, etc.
    song: Song = db.query(Song).filter(Song.id == song_id).first().__dict__
    song_listen: SongListen = SongListen(user_id=user_id, song_id=song_id, listened_on=datetime.now())
    db.add(song_listen)
    db.commit()
    return song.audio_url

def like_song(db: Session, song_id, user_id) -> str:
    liked_song_id = db.query(func.max(UserLikedSong.id)).scalar()
    new_liked_song_id = liked_song_id + 1 if liked_song_id else 1
    liked_song = UserLikedSong(id=new_liked_song_id, user_id=user_id, song_id=song_id)
    db.add(liked_song)
    db.commit()

def unlike_song(db: Session, song_id, user_id) -> str:
    unliked_song = db.query(UserLikedSong).filter_by(song_id=song_id, user_id=user_id).first()
    db.delete(unliked_song)
    db.commit()

def get_user_liked_songs(db: Session, user_id):
    liked_songs = db.query(UserLikedSong).filter_by(user_id=user_id).order_by(UserLikedSong.liked_at)
    return liked_songs

def get_liked_song_status(db: Session, song_id):
    status = db.query(UserLikedSong).filter(UserLikedSong.song_id == song_id).first()
    if status:
        return True
    return False

def check_status_of_song(db: Session, song_id, user_id, rec_creation: datetime):
    listened_song: SongListen = db.query(SongListen).filter_by(song_id=song_id, user_id=user_id).first()
    if not listened_song:
        return {"listened_to": False}

    return {"listened_to": True, "last_listened_to": listened_song.listened_on}

def get_songs_for_album(db: Session, album_id):
    songs = db.query(Song).filter_by(album_id = album_id).order_by(Song.index)
    album = db.query(Album).filter_by(id = album_id).first()
    album_artists = db.query(AlbumArtist).filter_by(album_id = album_id)
    artist_ids = [artist.artist_id for artist in album_artists]
    artists = db.query(Artist).filter(Artist.id.in_(artist_ids)).all()
    return {"album": album.__dict__, "songs": [song.__dict__ for song in songs], "artists": [artist.__dict__ for artist in artists]}

def get_album_for_song(db: Session, song_id):
    album = db.query(Album).join(Song, Song.album_id == Album.id).filter(Song.id == song_id).first()
    return album.__dict__
