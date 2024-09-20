from database.config import Base, engine
from sqlalchemy.orm import Session
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

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

with Session(engine) as session:
    bledsoef = User(
        id=1,
        username="bledsoef",
        email="bledsoef@berea.edu",
        first_name="Finn",
        last_name="Bledsoe",
        created_at=datetime(2024, 4, 4),
        is_artist=False,
        account_type="paid"
    )

    bahrs = User(
        id=2,
        username="bahrs",
        email="bahrs@berea.edu",
        first_name="Summer",
        last_name="Bahr",
        created_at=datetime(2024, 4, 4),
        is_artist=False,
        account_type="paid"
    )

    genre_1 = Genre(
        id="Rock"
    )

    artist_1 = Artist(
        id=1,
        name="Test Artist",
        genre_id="Rock",
        bio="asfdljasdf",
        image_url=""
    )

    album_1 = Album(
        id=1,
        title="Test Album",
        artist_id=1,
        genre_id="Rock",
        release_date=datetime(2024, 4, 4),
        image_url=""
    )

    song_1 = Song(
        id=1,
        title="Test Song",
        artist_id=1,
        album_id=None,
        genre_id="Rock",
        duration=50,
        release_date=datetime(2024, 6, 5),
        popularity=1,
        image_url="",
        audio_url=""
    )

    rec_1 = Rec(
        id=1,
        title="Test",
        body="Super sweet song",
        sender_id=1,
        recipient_id=2,
        created_at=datetime(2024, 6, 5),
        song_id=1,
        is_post=False
    )
    
    pending_rec_1 = PendingRec(
        id=1,
        rec_id=1,
        updated=datetime(2024, 4, 4)
    )
    session.add_all([bledsoef, bahrs]) # Users
    session.add_all([genre_1]) # Genres
    session.add_all([artist_1]) # Artists
    session.add_all([album_1]) # Album
    session.add_all([song_1]) # Song
    session.add_all([rec_1]) # Rec
    session.add_all([pending_rec_1]) # PendingRec
    session.commit()