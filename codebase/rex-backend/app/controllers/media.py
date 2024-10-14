from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.songs import *
from app.logic.albums import *
from app.logic.utils import *

router = APIRouter()    

@router.post("/playSong")
async def uploadSong(request: Request, db: Session = Depends(get_db)):
    review_data = await request.json()
    try:
        url, status = play_song(db, review_data)
        return {"message": url}
    except Exception as e:
        print(e)
        return {"message": "Failed to upload song"}

@router.get("/getUserLikedSongs")
async def getUserLikedSongs(user_id: str, db: Session = Depends(get_db)):
    try:
        liked_songs = get_user_liked_songs(db, user_id)
        return liked_songs
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch liked songs for user {user_id}"} 

@router.get("/getUserLikedAlbums")
async def getUserLikedAlbums(user_id: str, db: Session = Depends(get_db)):
    try:
        liked_albums = get_user_liked_albums(db, user_id)
        return liked_albums
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
        recentlyPlayed = ""
        return recentlyPlayed
    except Exception as e:
        print(e)
        return {"message": f"Failed to fetch recently played songs for user {user_id}"}  