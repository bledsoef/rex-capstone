from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.rex import *
from app.logic.reviews import *
router = APIRouter()

@router.post("/createReview")
async def createReview(request: Request, db: Session = Depends(get_db)):
    review_data = await request.json()
    try:
        create_new_review(db, review_data)
        return {"message": "Review created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create Review"}

@router.get("/getRecComments")
async def getRecComments(rec_id: int, db: Session = Depends(get_db)):
    try:
        return get_rec_review(db, rec_id)

    except Exception as e:
        print(e)
        return {"message": "Failed to create Review"}

@router.post("/createRecComment")
async def createReview(request: Request, db: Session = Depends(get_db)):
    rec_comment_data = await request.json()
    try:
        create_new_rec_comment(db, rec_comment_data)
        return {"message": "Review created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create Review"}