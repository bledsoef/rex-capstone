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
     