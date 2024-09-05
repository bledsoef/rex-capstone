from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from database.config import Base
from typing import List

class Review(Base):
    __tablename__ = 'reviews'
    
    id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    justification = Column(Integer)
    reviewed_at = Column(Date)
    
    rec: Mapped["Rec"] = relationship(back_populates="reviews", foreign_keys=[rec_id])
    review_comments: Mapped[List["ReviewComment"]] = relationship(back_populates="review")

class ReviewComment(Base):
    __tablename__ = 'review_comments'
    
    id = Column(Integer, primary_key=True)
    review_id = Column(Integer, ForeignKey('reviews.id'))
    text = Column(String)
    commented_at = Column(Date)
    
    review: Mapped["Review"] = relationship(back_populates="review_comments")

class UserLikedSong(Base):
    __tablename__ = 'users_liked_songs'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    liked_at = Column(Date)
    
    song: Mapped["Song"] = relationship(back_populates="liked_by_users")
    user: Mapped["User"] = relationship(back_populates="liked_songs")

class UserFollowedPlaylist(Base):
    __tablename__ = 'users_followed_playlists'
    
    id = Column(Integer, primary_key=True)
    playlist_id = Column(Integer, ForeignKey('playlists.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    
    playlist: Mapped["Playlist"] = relationship(back_populates="followers")
    user: Mapped["User"] = relationship(back_populates="followed_playlists")

class Genre(Base):
    __tablename__ = 'genres'
    
    id = Column(String, primary_key=True)

class Rec(Base):
    __tablename__ = 'recs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(String, nullable=False)
    sender_id = Column(Integer, ForeignKey('users.id'))
    recipient_id = Column(Integer, ForeignKey('users.id'))
    status = Column(String)
    created_at = Column(Date)
    song_id = Column(Integer, ForeignKey('songs.id'), nullable=True)
    artist_id = Column(Integer, ForeignKey('artists.id'), nullable=True)
    album_id = Column(Integer, ForeignKey('albums.id'), nullable=True)
    is_post = Column(Boolean, default=False)
    
    sender: Mapped["User"] = relationship(foreign_keys=[sender_id], back_populates="sent_recs")
    recipient: Mapped["User"] = relationship(foreign_keys=[recipient_id], back_populates="received_recs")
    song: Mapped["Song"] = relationship(back_populates="recs")
    artist: Mapped["Artist"] = relationship(back_populates="recs")
    album: Mapped["Album"] = relationship(back_populates="recs")
    reviews: Mapped[List["Review"]] = relationship(back_populates="rec")
    accepted_recs: Mapped[List["AcceptedRec"]] = relationship(back_populates="rec")
    completed_recs: Mapped[List["CompletedRec"]] = relationship(back_populates="rec")
    archived_recs: Mapped[List["ArchivedRec"]] = relationship(back_populates="rec")

class AcceptedRec(Base):
    __tablename__ = 'accepted_recs'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    updated = Column(Date)
    
    rec: Mapped["Rec"] = relationship(back_populates="accepted_recs")

class CompletedRec(Base):
    __tablename__ = 'completed_recs'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    updated = Column(Date)
    
    rec: Mapped["Rec"] = relationship(back_populates="completed_recs")

class ArchivedRec(Base):
    __tablename__ = 'archived_recs'
    
    id = Column(Integer, primary_key=True)
    rec_id = Column(Integer, ForeignKey('recs.id'))
    updated = Column(Date)
    
    rec: Mapped["Rec"] = relationship(back_populates="archived_recs")

class Album(Base):
    __tablename__ = 'albums'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    release_date = Column(Date)
    image_url = Column(String)
    
    artist: Mapped["Artist"] = relationship(back_populates="albums")
    genre: Mapped["Genre"] = relationship(back_populates="albums")
    recs: Mapped[List["Rec"]] = relationship(back_populates="album")
    songs: Mapped[List["Song"]] = relationship(back_populates="album")

class AlbumArtist(Base):
    __tablename__ = 'album_artists'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    artist_id = Column(Integer, ForeignKey('artists.id'))
    
    song: Mapped["Song"] = relationship(back_populates="album_artists")
    artist: Mapped["Artist"] = relationship(back_populates="album_artists")

class Artist(Base):
    __tablename__ = 'artists'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    genre_id = Column(String, ForeignKey('genres.id'))
    bio = Column(String)
    image_url = Column(String)
    
    genre: Mapped["Genre"] = relationship(back_populates="artists")
    recs: Mapped[List["Rec"]] = relationship(back_populates="artist")
    albums: Mapped[List["Album"]] = relationship(back_populates="artist")
    songs: Mapped[List["Song"]] = relationship(back_populates="artist")
    album_artists: Mapped[List["AlbumArtist"]] = relationship(back_populates="artist")
    song_artists: Mapped[List["SongArtist"]] = relationship(back_populates="artist")

class Song(Base):
    __tablename__ = 'songs'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    album_id = Column(Integer, ForeignKey('albums.id'))
    genre_id = Column(String, ForeignKey('genres.id'))
    duration = Column(Integer)
    release_data = Column(Date)
    popularity = Column(Integer)
    image_url = Column(Integer)
    
    genre: Mapped["Genre"] = relationship(back_populates="songs")
    artist: Mapped["Artist"] = relationship(back_populates="songs")
    album: Mapped["Album"] = relationship(back_populates="songs")
    recs: Mapped[List["Rec"]] = relationship(back_populates="song")
    liked_by_users: Mapped[List["UserLikedSong"]] = relationship(back_populates="song")
    album_artists: Mapped[List["AlbumArtist"]] = relationship(back_populates="song")
    song_artists: Mapped[List["SongArtist"]] = relationship(back_populates="song")
    playlist_songs: Mapped[List["PlaylistSong"]] = relationship(back_populates="song")

class SongArtist(Base):
    __tablename__ = 'song_artists'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    artist_id = Column(Integer, ForeignKey('artists.id'))
    is_primary_artist = Column(Boolean)  # collaborator or main artist
    is_secondary_artist = Column(Boolean)  # features
    
    song: Mapped["Song"] = relationship(back_populates="song_artists")
    artist: Mapped["Artist"] = relationship(back_populates="song_artists")

class Playlist(Base):
    __tablename__ = 'playlists'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    created_by = Column(Integer)
    updated_at = Column(Date)
    image_url = Column(String)
    
    songs: Mapped[List["PlaylistSong"]] = relationship(back_populates="playlist")
    followers: Mapped[List["UserFollowedPlaylist"]] = relationship(back_populates="playlist")

class PlaylistSong(Base):
    __tablename__ = 'playlist_songs'
    
    id = Column(Integer, primary_key=True)
    song_id = Column(Integer, ForeignKey('songs.id'))
    playlist_id = Column(Integer, ForeignKey('playlists.id'))
    
    playlist: Mapped["Playlist"] = relationship(back_populates="songs")
    song: Mapped["Song"] = relationship(back_populates="playlist_songs")

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    created_at = Column(Date)
    is_artist = Column(Boolean)
    account_type = Column(String)
    
    sent_recs: Mapped[List["Rec"]] = relationship(foreign_keys=[Rec.sender_id], back_populates="sender")
    received_recs: Mapped[List["Rec"]] = relationship(foreign_keys=[Rec.recipient_id], back_populates="recipient")
    liked_songs: Mapped[List["UserLikedSong"]] = relationship(back_populates="user")
    followed_playlists: Mapped[List["UserFollowedPlaylist"]] = relationship(back_populates="user")
