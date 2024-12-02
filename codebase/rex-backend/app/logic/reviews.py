from sqlalchemy.orm import Session, aliased
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.Artist import Artist
from app.models.Connection import Connection
from app.models.Genre import Genre
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.PlaylistCreator import PlaylistCreator
from app.models.Rec import Rec
from app.models.Review import Review
from app.models.RecComment import RecComment
from app.models.Song import Song
from app.models.SongArtist import SongArtist
from app.models.SongListen import SongListen
from app.models.User import User
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
from app.models.UserLikedAlbum import UserLikedAlbum
from app.models.UserLikedSong import UserLikedSong
from app.logic.utils import obj_list_to_dict
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
        new_review = RecComment(createdBy=review_data['author'], rec_id=review_data['rec'], dateCreated=datetime.now(), comment=review_data['comment'], rating=review_data['rating'])
        rec = db.query(Rec).filter(Rec.id == review_data['rec']).first()
        rec.status = 'completed'
        db.add(rec)
        db.add(new_review)
        db.commit()
    except Exception as e:
        print(e)
        return False

def get_user_reviews(db: Session, username):
    user_reviews = [entry.__dict__ for entry in db.query(Review).filter(Review.createdBy==username)]
    return user_reviews

def get_post_reviews(db: Session, rec_id):
    review = db.query(Review).filter(Review.rec_id==rec_id).all()
    return review

def get_rec_review(db: Session, rec_id):
    review = db.query(Review).filter(Review.rec_id==rec_id).first()
    review_comments = db.query(RecComment).filter(RecComment.rec_id==rec_id).all()
    return {"review": review, "review_comments": obj_list_to_dict(review_comments)}