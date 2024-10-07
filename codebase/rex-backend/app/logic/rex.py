from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, or_
from app.logic.utils import obj_list_to_dict
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

def accept_rec_from_post(db: Session, rec_id: int, user_id: str):
    try:
        rec: Rec = db.query(Rec).filter(Rec.id == rec_id).first()
        rec_id = db.query(func.max(Rec.id)).scalar() + 1
        new_rec = Rec(
            id=rec_id,
            sender_id=rec.sender_id,
            body=rec.body,
            created_at=rec.created_at,
            recipient_id=user_id,
            song_id=rec.song_id if rec.song_id else None,
            artist_id=rec.artist_id if rec.artist_id else None, 
            album_id=rec.album_id if rec.album_id else None, 
            isPost=False
        )
        pending_rec_id = db.query(func.max(PendingRec.id)).scalar() + 1
        new_pending_rec = PendingRec(
            rec=pending_rec_id,
            updated=datetime.now()
        )
        db.add(new_rec)
        db.add(new_pending_rec)
        db.commit()
    except Exception as e:
        print(e)
        return False
    return True

def archive_rec(db: Session, rec_id):
    try:
        pending_rec = db.query(PendingRec).filter(PendingRec.rec_id==rec_id).first()
        db.delete(pending_rec)
        archived_rec_id = db.query(func.max(PendingRec.id)).scalar() + 1
        archived_rec = ArchivedRec(id=archived_rec_id, rec_id=rec_id)
        db.add(archived_rec)
        db.commit()
    except Exception as e:
        print(e)
        return False
    return True

def get_received_recs(db: Session, user_id: str):
    received_pending = [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'pending').all()]
    received_rejected = [entry.__dict__ for entry in db.query(Rec).filter(Rec.sentTo == user_id, Rec.status == 'rejected').all()]
    received_completed = [
        dict(rec=rec.__dict__, review=review.__dict__) if review else dict(rec=rec.__dict__)
        for rec, review in(
            db.query(Rec, Review)
            .join(Review, Rec.id == Review.rec_id, isouter=True)
            .filter(Rec.sentTo == user_id, Rec.status == 'completed')
            .all()
    )]
    return {'pending': received_pending, 'completed': received_completed, 'rejected': received_rejected}

def get_pending_sent_recs(db: Session, user_id: int):
    recs = db.query(Rec).join(PendingRec, Rec.pending_recs).filter(Rec.sender_id == user_id)
    return obj_list_to_dict(recs) 

def get_non_user_posts(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    result = (
        db.query(Rec, User, Playlist, Song, Album)
            .outerjoin(User, Rec.sender_id == User.id)
            .outerjoin(Playlist, Rec.playlist_id == Playlist.id)
            .outerjoin(Song, Rec.song_id == Song.id)
            .outerjoin(Album, Rec.album_id == Album.id)
            .filter(Rec.is_post == True, Rec.sender_id != user.id)
            .filter(or_(Rec.playlist_id.isnot(None), Rec.song_id.isnot(None), Rec.album_id.isnot(None)))
        .all()
    )   
    filtered_results = []
    for rec, user, playlist, song, album in result:
        media_object = None
        media_type = None
        media_creator = None
        if playlist:
            media_type = "playlist"
            media_object = db.query(Playlist, User).join(User, Playlist.created_by==User.id).filter(Playlist.id == playlist.id).first()
            media_creator = media_object.user.__dict__
        if song:
            media_type = "song"
            media_object = db.query(Song, Artist).join(Artist, Song.artist_id==Artist.id).filter(Song.id == song.id).first()
            media_creator = media_object.artist.__dict__

        if album:
            print(album)
            media_type = "album"
            media_object = db.query(Album).join(Artist, Album.artist_id==Artist.id).filter(Album.id == album.id).first()
            media_creator = media_object.artist.__dict__
            print(media_object)
        
        pendingRec = db.query(Rec).filter(Rec.post_rec == rec.id).first()
        addedToCollection = False
        if pendingRec:
            addedToCollection = True
        filtered_results.append({"rec":rec.__dict__, "user": user, "media_creator": media_creator, "media": media_object.__dict__, "media_type": media_type, "added_to_collection": addedToCollection})
    return filtered_results


