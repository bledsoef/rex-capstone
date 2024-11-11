from fastapi import APIRouter, Depends, Request
from sqlalchemy import func, delete
from sqlalchemy.orm import Session
from datetime import datetime

from app.logic.utils import obj_list_to_dict
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
from app.models.ReviewComment import ReviewComment
from app.models.Song import Song
from app.models.SongArtist import SongArtist
from app.models.SongListen import SongListen
from app.models.User import User
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
from app.models.UserLikedAlbum import UserLikedAlbum
from app.models.UserLikedSong import UserLikedSong

def create_new_playlist(db: Session, playlist_data):
    try:
        new_playlist_id = db.query(func.max(Playlist.id)).scalar() or 0
        new_playlist = Playlist(
            id=new_playlist_id+1,
            title=playlist_data["playlist_name"],
            updated_at=datetime.now()
        )
        db.add(new_playlist)
        db.commit()

        new_playlist_creator_id = db.query(func.max(PlaylistCreator.id)).scalar() or 0
        new_playlist_creator = PlaylistCreator(
            id=new_playlist_creator_id+1,
            playlist_id=new_playlist.id,
            user_id=playlist_data["user_id"]
        )
        db.add(new_playlist_creator)
        db.commit()
        return "success"
    except Exception as e:
        print(e)
        return "failure"
    
def add_song_to_playlist(db: Session, song_id, playlist_id):
    try:
        new_playlist_song = PlaylistSong(song_id=song_id, playlist_id=playlist_id)
        db.add(new_playlist_song)
        db.commit()
        return "success"
    except Exception as e:
        print(e)
        return "failure"

def follow_playlist(db: Session, user_id, playlist_id):
    try:
        new_playlist_follow = UserFollowedPlaylist(user_id, playlist_id)
        db.add(new_playlist_follow)
        db.commit()
        return "success"
    except Exception as e:
        print(e)
        return "failure"
    
def delete_song_from_playlist(db: Session, song_id, playlist_id):
    try:
        deleted_playlist_song = db.query(PlaylistSong).filter_by(song_id=song_id, playlist_id=playlist_id).first()
        db.delete(deleted_playlist_song)
        db.commit()
        return "success"
    except Exception as e:
        print(e)
        return "failure"
    
def unfollow_playlist(db: Session, user_id, playlist_id):
    try:
        unfollowed_playlist = db.query(UserFollowedPlaylist).filter_by(user_id=user_id, playlist_id=playlist_id).first()
        db.delete(unfollowed_playlist)
        db.commit()
        return "success"
    except Exception as e:
        print(e)
        return "failure"
    
def get_user_playlists(db: Session, user_id):
    try:
        created_playlists = db.query(Playlist).join(PlaylistCreator, PlaylistCreator.playlist_id == Playlist.id).filter(PlaylistCreator.user_id == user_id).all()
        followed_playlists = db.query(Playlist).join(UserFollowedPlaylist, UserFollowedPlaylist.playlist_id == Playlist.id).filter(UserFollowedPlaylist.user_id == user_id).all()
        return obj_list_to_dict(created_playlists + followed_playlists)
    except Exception as e:
        print(e)
        return False

def get_songs_for_playlist(db: Session, playlist_id, user_id):
    try:
        playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()
        if playlist.title == "My Liked Songs":
            playlist_songs = db.query(Song).join(UserLikedSong, UserLikedSong.song_id == Song.id).filter(UserLikedSong.user_id == user_id).all()
        else:
            playlist_songs = db.query(Song).join(PlaylistSong, PlaylistSong.song_id == Song.id).filter(PlaylistSong.playlist_id == playlist_id).all()
        
        playlist_creators = db.query(User).join(PlaylistCreator, PlaylistCreator.user_id == User.id).filter(PlaylistCreator.playlist_id == playlist_id).all() 
        return {"playlist": playlist.__dict__,"songs": obj_list_to_dict(playlist_songs), "creators": playlist_creators}
    except Exception as e:
        print(e)
        return False