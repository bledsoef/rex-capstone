from sqlalchemy.orm import Session
from app.models.User import User
def create_new_user(db: Session, user_data):
    try:
        new_user = User(**user_data)
        db.add(new_user)
        db.commit()
        return True
    except Exception as e:
        return False