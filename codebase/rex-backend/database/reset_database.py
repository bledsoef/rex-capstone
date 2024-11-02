from database.config import Base, engine
from sqlalchemy.orm import Session
from app.models.Album import Album
from app.models.AlbumArtist import AlbumArtist
from app.models.Artist import Artist
from app.models.Connection import Connection
from app.models.Genre import Genre
from app.models.PlaylistCreator import PlaylistCreator
from app.models.Playlist import Playlist
from app.models.PlaylistSong import PlaylistSong
from app.models.Listen import Listen
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
    bledsoefinn0 = User(
        id=3,
        username="bledsoefinn0",
        email="bledsoefinn0@gmail.com",
        first_name="Finn",
        last_name="Bledsoe",
        created_at=datetime(2024, 4, 4),
        is_artist=False,
        account_type="paid"
    )

    genre_1 = Genre(
        id="Rock"
    )
    genre_2 = Genre(
        id="Lofi"
    )
    artist_1 = Artist(
        id=1,
        name="Loksii",
        genre_id="Lofi",
        bio="asfdljasdf",
    )
    artist_2 = Artist(
        id=2,
        name="AVBE",
        genre_id="Lofi",
        bio="asfdljasdf",
    )
    artist_3 = Artist(
        id=3,
        name="Amaski",
        genre_id="Lofi",
        bio="asfdljasdf",
    )
    album_1 = Album(
        id=1,
        title="Silent Alarm",
        genre_id="Rock",
        release_date=datetime(2024, 4, 4),
    )

    album_2 = Album(
        id=2,
        title="Unlicensed",
        genre_id="Lofi",
        release_date=datetime(2024, 4, 4),
    )

    album_artist_1 = AlbumArtist(
        id=1,
        album_id=2,
        artist_id=2
    )
    album_artist_2 = AlbumArtist(
        id=2,
        album_id=1,
        artist_id=1
    )
    liked_album_1 = UserLikedAlbum(
        id=1,
        album_id=album_2.id,
        user_id=bledsoefinn0.id,
        liked_at=datetime(2024, 4, 6)
    )

    liked_album_2 = UserLikedAlbum(
        id=2,
        album_id=album_1.id,
        user_id=bledsoefinn0.id,
        liked_at=datetime(2024, 4, 6)
    )

    song_1 = Song(
        id=1,
        title="Flow",
        album_id=2,
        genre_id="Lofi",
        duration=50,
        index=1,
        release_date=datetime(2024, 6, 5),
        popularity=1,
    )

    song_artist_1 = SongArtist(
        id=1,
        song_id=song_1.id,
        artist_id=artist_1.id
    )

    song_2 = Song(
        id=2,
        title="Night in Kyoto",
        album_id=2,
        genre_id="Lofi",
        index=2,
        duration=117,
        release_date=datetime(2024, 6, 5),
        popularity=1,
    )

    song_artist_2 = SongArtist(
        id=2,
        song_id=song_2.id,
        artist_id=artist_2.id
    ) 

    song_3 = Song(
        id=3,
        title="Night Detective",
        album_id=2,
        genre_id="Lofi",
        index=3,
        duration=117,
        release_date=datetime(2024, 6, 5),
        popularity=1,
    )

    song_artist_3 = SongArtist(
        id=3,
        song_id=song_3.id,
        artist_id=artist_3.id
    )

    rec_1 = Rec(
        id=1,
        body="If you like Bloc Party you will love this song!",
        sender_id=2,
        recipient_id=None,
        created_at=datetime(2024, 6, 5),
        album_id=2,
        is_post=True
    )

    rec_2 = Rec(
        id=2,
        body="Great atmospheric for studyinh",
        sender_id=2,
        recipient_id=None,
        created_at=datetime(2024, 6, 5),
        album_id=1,
        is_post=True
)
    
    connection_1 = Connection(
        id=1,
        user_id=bahrs.id,
        friend_id=bledsoefinn0.id
    )
    connection_2 = Connection(
        id=2,
        user_id=bledsoefinn0.id,
        friend_id=bahrs.id
    )

    connection_3 = Connection(
        id=3,
        user_id=bledsoefinn0.id,
        friend_id=bledsoef.id
    )
    connection_4 = Connection(
        id=4,
        user_id=bledsoef.id,
        friend_id=bledsoefinn0.id
    )

    liked_playlist_1 = Playlist(
        id=1,
        title="My Liked Songs",
        updated_at=datetime(2024, 6, 5)
    )

    liked_playlist_creator_1 = PlaylistCreator(
        id=1,
        playlist_id=1,
        user_id=3
    )

    liked_song_1 = UserLikedSong(
        id=1,
        song_id=1,
        user_id=bledsoefinn0.id
    )


    session.add_all([bledsoef, bahrs, bledsoefinn0]) # Users
    session.commit()
    session.add_all([genre_1, genre_2]) # Genres
    session.commit()
    session.add_all([artist_1, artist_2, artist_3]) # Artists
    session.commit()
    session.add_all([album_1, album_2]) # Album
    session.commit()
    session.add_all([album_artist_1, album_artist_2])
    session.commit()
    session.add_all([liked_album_1, liked_album_2]) # Album
    session.commit()
    session.add_all([song_1, song_2, song_3]) # Song
    session.commit()
    session.add_all([song_artist_1, song_artist_2, song_artist_3]) # SongArtist
    session.commit()
    session.add_all([rec_1, rec_2]) # Rec
    session.commit()
    session.add_all([connection_1, connection_2, connection_3, connection_4])
    session.commit()
    session.add_all([liked_playlist_1]) # Playlist
    session.commit()
    session.add_all([liked_song_1]) # UserLikedSongs
    session.commit()
    session.add_all([liked_playlist_creator_1]) # PlaylistCreator
    session.commit()