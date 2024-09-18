from sqlalchemy.orm import Session, aliased
from app.models.AcceptedRec import AcceptedRec
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.ArchivedRec import ArchivedRec
from app.models.Artist import Artist
from app.models.CompletedRec import CompletedRec
from app.models.Genre import Genre
from app.models.PendingRec import PendingRec
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.Rec import Rec
from app.models.Review import Review
from app.models.ReviewComment import ReviewComment
from app.models.Song import Song
from app.models.SongArtist import SongArtist
from app.models.SongListen import SongListen
from app.models.User import User
from app.models.UserFollowedPlaylist import UserFollowedPlaylist
from app.models.UserLikedAlbum import UserLikedAlbum
from app.models.UserLikedSong import UserLikedSong
from datetime import datetime
def create_new_rec(db: Session, rec_data):
    if not rec_data["isPost"]:
        for recipient in rec_data['recipients']:  
            try:
                new_rec = Rec(mediaName=rec_data['mediaName'], artistName=rec_data["artistName"], description=rec_data["description"], createdBy=rec_data['sender'], sentTo=recipient, isPost=False, image=("/album_covers/"+"".join([i.lower() for i in rec_data["mediaName"]])), status="pending")
                db.add(new_rec)
                db.commit()
            except Exception as e:
                print(e)
                return False
    else:
        try:
            new_rec = Rec(mediaName=rec_data['mediaName'], artistName=rec_data["artistName"], description=rec_data["description"], createdBy=rec_data['sender'], sentTo=None, isPost=True, image=("/album_covers/"+"".join([i.lower() for i in rec_data["mediaName"]])), status="pending")
            db.add(new_rec)
            db.commit()
        except Exception as e:
            print(e)
            return False
    
    return True

def accept_rec_from_user(db: Session, rec_id):
    try:
        rec = db.query(Rec).filter(Rec.id == rec_id).first()
        rec.status = 'accepted'
        db.add(rec)
        db.commit()
    except Exception as e:
        print(e)
        return False
    return True

def accept_rec_from_post(db: Session, rec_id: int, user_id: str):
    try:
        rec = db.query(Rec).filter(Rec.id == rec_id).first()
        new_rec = Rec(createdBy=rec.createdBy, mediaName=rec.mediaName, artistName=rec.artistName, description=rec.description, sentTo=user_id, image=rec.image,status="accepted", isPost=False)
        db.add(new_rec)
        db.commit()
    except Exception as e:
        print(e)
        return False
    return True

def reject_rec(db: Session, rec_id):
    try:
        rec = db.query(Rec).filter(Rec.id == rec_id).first()
        rec.status ='rejected'
        db.add(rec)
        db.commit()
    except Exception as e:
        print(e)
        return False
    return True

def get_received_recs(db: Session, user_id: str):
    received_pending = [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'pending').all()]
    received_rejected = [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'rejected').all()]
    received_accepted = [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'accepted').all()]
    received_completed = [
        dict(rec=rec.__dict__, review=review.__dict__) if review else dict(rec=rec.__dict__)
        for rec, review in(
            db.query(Rec, Review)
            .join(Review, Rec.id == Review.rec_id, isouter=True)
            .filter(Rec.sentTo == user_id, Rec.status == 'completed')
            .all()
    )]
    return {'pending': received_pending, 'accepted': received_accepted, 'completed': received_completed, 'rejected': received_rejected}

def get_requests(db: Session, user_id: str):
    return [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'pending').all()]


def get_pending_sent_recs(db: Session, user_id: int):
    recs = db.query(Rec).join(PendingRec, Rec.pending_recs).filter(Rec.sender_id == user_id)
    return obj_list_to_dict(recs) 

def get_posts(db: Session, user_id: str):
    return db.query(Rec).filter(Rec.createdBy == user_id).all()

def get_non_user_posts(db: Session, user_id: str):

    return db.query(Rec).filter(Rec.isPost == True, Rec.createdBy != user_id).all()


def obj_list_to_dict(obj_list):
    return [entry.__dict__ for entry in obj_list]