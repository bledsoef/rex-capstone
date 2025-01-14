from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.songs import *
from app.logic.albums import *
from app.logic.utils import *
from app.logic.playlists import *

router = APIRouter()    

@router.post("/playSong")
async def playSong(request: Request, db: Session = Depends(get_db)):
    song_data = await request.json()
    try:
        play_song(db, song_data)
        return True
    except Exception as e:
        print(e)
        return False

@router.post("/pauseSong")
async def stopSong(request: Request, db: Session = Depends(get_db)):
    song_data = await request.json()
    try:
        pause_song(db, song_data)
        return True
    except Exception as e:
        print(e)
        return False
    
@router.post("/resumeSong")
async def resumeSong(request: Request, db: Session = Depends(get_db)):
    song_data = await request.json()
    try:
        resume_song(db, song_data)
        return True
    except Exception as e:
        print(e)
        return False

@router.get("/getUserLikedSongs")
async def getUserLikedSongs(user_id: str, db: Session = Depends(get_db)):
    try:
        liked_songs = get_user_liked_songs(db, user_id)
        return liked_songs
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch liked songs for user {user_id}"} 

@router.get("/getLikedSongStatus")
async def getLikedSongStatus(song_id: str, db: Session = Depends(get_db)):
    try:
        status = get_liked_song_status(db, song_id)
        return status
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch liked song status for song_id {song_id}"} 

@router.get("/getLibraryForUser")
async def getLibraryForUser(user_id: str, db: Session = Depends(get_db)):
    try:
        playlists = get_user_playlists(db, user_id)
        liked_albums = get_user_liked_albums(db, user_id)
        return {"playlists": playlists, "albums": liked_albums}
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch liked songs for user {user_id}"} 


@router.get("/getSongsForAlbum")
async def getSongsForAlbum(album_id: str, db: Session = Depends(get_db)):
    try:
        songs = get_songs_for_album(db, album_id)
        return songs
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch songs for album_id {album_id}"} 

@router.get("/getAlbumForSong")
async def getAlbumForSong(song_id: str, db: Session = Depends(get_db)):
    try:
        album = get_album_for_song(db, song_id)
        return album
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch album for song_id {song_id}"} 


@router.get("/search")
async def Search(query: str, db: Session = Depends(get_db)):
    try:
        results = search(db, query)
        return results
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch results for query {query}"} 

@router.get('/recentlyPlayed')
async def recentlyPlayed(user_id: str, db: Session = Depends(get_db)):
    try:
        recently_played = get_recently_played_songs(db, user_id)
        return recently_played
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch recently played songs for user {user_id}"}  

@router.post("/likeSong")
async def likeSong(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    try:
        songs = like_song(db, data["song_id"], data["user_id"])
        return songs
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}
     
@router.post("/unlikeSong")
async def unlikeSong(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    try:
        songs = unlike_song(db, data["song_id"], data["user_id"])
        return songs
    except Exception as e:
        print(e)
        return {"message": "Failed to create playlist"}