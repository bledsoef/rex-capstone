from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.songs import *
router = APIRouter()

@router.post("/uploadSong")
async def uploadSong(request: Request, db: Session = Depends(get_db)):
    review_data = await request.json()
    try:
        upload_new_song(db, review_data)
        return {"message": "Review created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create Review"}
    