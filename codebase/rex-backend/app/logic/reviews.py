from sqlalchemy.orm import Session, aliased
from app.models.models import Rec, Review
from datetime import datetime
def create_new_review(db: Session, review_data):
    try:
        new_review = Review(createdBy=review_data['author'], rec_id=review_data['rec'], dateCreated=datetime.now(), comment=review_data['comment'], rating=review_data['rating'])
        rec = db.query(Rec).filter(Rec.id == review_data['rec']).first()
        rec.status = 'completed'
        db.add(rec)
        db.add(new_review)
        db.commit()
    except Exception as e:
        print(e)
        return False
    
def create_new_review_comment(db: Session, review_data):
    try:
        new_review = Review(createdBy=review_data['author'], rec_id=review_data['rec'], dateCreated=datetime.now(), comment=review_data['comment'], rating=review_data['rating'])
        rec = db.query(Rec).filter(Rec.id == review_data['rec']).first()
        rec.status = 'completed'
        db.add(rec)
        db.add(new_review)
        db.commit()
    except Exception as e:
        print(e)
        return False

def get_user_reviews(db:Session, username):
    user_reviews = [entry.__dict__ for entry in db.query(Review).filter(Review.createdBy==username)]
    return user_reviews

def get_post_reviews(db:Session, rec_id):
    review = db.query(Review).filter(Review.rec_id==rec_id).all()
    return review