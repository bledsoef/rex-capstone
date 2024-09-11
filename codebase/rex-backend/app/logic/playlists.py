from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
def create_new_playlist(db: Session, playlist_data):
    try:
        new_playlist = Playlist(**playlist_data)
        db.add(new_playlist)
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