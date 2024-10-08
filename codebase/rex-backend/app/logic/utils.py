from sqlalchemy.orm import Session, aliased
from sqlalchemy import func, or_
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

def obj_list_to_dict(obj_list):
    return [entry.__dict__ for entry in obj_list]

def search(db: Session, query: str):
    formatted_query = f"%{query}%"
    albums = db.query(Album).filter(Album.title.ilike(formatted_query)).limit(10).all()
    songs = db.query(Song).filter(Song.title.ilike(formatted_query)).limit(10).all()
    artists = db.query(Artist).filter(Artist.name.ilike(formatted_query)).limit(10).all()
    
    songResults = []
    for song in songs:
        album = db.query(Album).filter_by(id = song.album_id).first()
        artists = db.query(Artist).join(SongArtist, SongArtist.artist_id==Artist.id).filter_by(song_id = song.id).all()
        songResults.append({'song': song, 'artists': obj_list_to_dict(artists), 'album': album})

    albumResults = []
    for album in albums:
        artists = db.query(Artist).join(AlbumArtist, AlbumArtist.artist_id==Artist.id).filter_by(album_id = album.id).all()
        albumResults.append({'artists': obj_list_to_dict(artists), 'album': album})

    results = {
        'albums': albumResults,
        'songs': songResults,
        'artists': artists
    }

    return results