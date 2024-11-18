from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.playlists import *
router = APIRouter()

@router.post("/createPlaylist")
async def createPlaylist(request: Request, db: Session = Depends(get_db)):
    playlist_data = await request.json()
    try:
        create_new_playlist(db, playlist_data)
        return {"message": "Playlist created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}
    
@router.get("/getSongsForPlaylist")
async def getSongsForPlaylist(playlist_id: int, user_id: int, db: Session = Depends(get_db)):
    try:
        songs = get_songs_for_playlist(db, playlist_id, user_id)
        return songs
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}

@router.get("/getPlaylist")
async def getSongsForPlaylist(playlist_id: int, db: Session = Depends(get_db)):
    try:
        songCount, playlist = get_playlist(db, playlist_id)
        return {"songCount": songCount, "playlist": playlist}
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}
     
@router.get("/getPlaylistsForUser")
async def getSongsForPlaylist(user_id: int, db: Session = Depends(get_db)):
    try:
        playlists = get_user_playlists(db, user_id)
        return playlists
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}