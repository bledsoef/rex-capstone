from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database.config import get_db
from app.logic.users import *
router = APIRouter()

@router.post("/createUser")
async def createUser(request: Request, db:Session = Depends(get_db)):
    user_data = await request.json()
    try:
        isNewUser = create_new_user(db, user_data)
        if isNewUser:
            return {"message": "User successfully created!", "success":True}
        return {"message": "There is already a user with this email/username.", "success":False}
    except Exception as e:
        print("Error creating user", e)
        return {"message": "Error creating user.", "success":False}
    
    
@router.get("/getUser")
async def getUser(email: str, db:Session = Depends(get_db)):
    try:
        user = get_user(db, email)
        return user
    except Exception as e:
        print("Error creating user", e)
        return {"message": "Error creating user.", "success":False} 

    
@router.get("/getNetworkForUser")
async def getUser(user_id: str, db:Session = Depends(get_db)):
    try:
        user = get_network(db, user_id)
        return user
    except Exception as e:
        print("Error getting network", e)
        return {"message": "Error fetching network for user.", "success":False} 
