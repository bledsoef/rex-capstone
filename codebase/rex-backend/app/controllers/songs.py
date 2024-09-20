from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.songs import *
router = APIRouter()

@router.post("/f")
async def uploadSong(request: Request, db: Session = Depends(get_db)):
    review_data = await request.json()
    try:
        url, status = play_song(db, review_data)
        return {"message": url}
    except Exception as e:
        print(e)
        return {"message": "Failed to upload song"}
    