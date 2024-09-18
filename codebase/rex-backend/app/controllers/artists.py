from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.playlists import *
from app.logic.songs import *
router = APIRouter()

@router.post("/createArtist")
async def createPlaylist(request: Request, db: Session = Depends(get_db)):
    playlist_data = await request.json()
    try:
        create_new_playlist(db, playlist_data)
        return {"message": "Playlist created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}

@router.post("/uploadSong")
async def uploadSong(request: Request, db: Session = Depends(get_db)):
    song_data = await request.json()
    try:
        upload_new_song(db, song_data)
        return {"message": "Song uploaded"}
    except Exception as e:
        print(e)
        return {"message": "Failed to upload song"}