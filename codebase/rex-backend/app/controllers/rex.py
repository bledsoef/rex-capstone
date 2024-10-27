from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.rex import *
from app.logic.reviews import *
router = APIRouter()

@router.post("/createRec")
async def createRec(request: Request, db :Session = Depends(get_db)):
    rec_data = await request.json()
    try:
        create_new_rec(db, rec_data)
        return {"message": "Rec created"}
    except Exception as e:
        print(e)
        return {"message": "Failed to create rec"}


@router.get("/getRecs")
async def getRecs(user_id: int, db: Session = Depends(get_db)):
    try:
        sent = get_sent_recs(db, user_id)
        received = get_received_recs(db, user_id)
        return {"sent": sent,'received': received}
    except Exception as e:
        print(e)
        return []

@router.post("/addToCollection")
async def addToCollection(request: Request, db :Session = Depends(get_db)):
    data = await request.json()
    try:
        accept_rec_from_post(db, data["recID"], data["userID"])
        return {"message": "Rec accepted."}
    except Exception as e:
        print(e)
        return {"message": "Failed to create rec"}

@router.post("/archiveRec")
async def archiveRec(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    try:
        # archive_rec(db, data["rec_id"])
        return {"message": "Rec accepted."}
    except Exception as e:
        print(e)
        return {"message": "Failed to create rec"}


@router.get("/checkPostStatus")
async def checkPostStatus(rec_id, user_id, db: Session = Depends(get_db)):
    try:
        post_status = get_post_status(db, user_id, rec_id)
        return post_status
    except Exception as e:
        print(e)
        return {"message": "Failed to create rec"}
# @router.get("/getRequestsForUser")
# async def getRequestsForUser(username:str, db :Session = Depends(get_db)):
#     try:
#         return get_requests(db, username)
#     except Exception as e:
#         print(e)
#         return {"message": "Failed to get requests"}

@router.get("/getReceivedRecsForUser")
async def getReceivedRecsForUser(username: str, db: Session = Depends(get_db)):
    try:
        received_recs = get_received_recs(db, username)
        
        return received_recs
    except Exception as e:
        print(e)
        return {"message": "Failed to get recs"}

@router.get("/getFeedForUser")
async def getFeedForUser(email: str, db: Session = Depends(get_db)):
    try:
        non_user_posts = get_non_user_posts(db, email)
        return non_user_posts
    except Exception as e:
        print(e)
        return {"message": "Failed to get recs"}