# Design
## Third Party Docs
- [Streaming Platform - User Experience](https://www.canva.com/design/DAGPlP_FNFE/vWbdvy-5S9RQOkFI6-t70A/edit?ui=eyJEIjp7IlQiOnsiQSI6IlBCNkJQMkpZTHJYTERKbDcifX19)
- [Recommendation Platform - User Experience](https://www.canva.com/design/DAGPlP_FNFE/vWbdvy-5S9RQOkFI6-t70A/edit?ui=eyJEIjp7IlQiOnsiQSI6IlBCNkJQMkpZTHJYTERKbDcifX19)
- [Tech Stack](https://www.canva.com/design/DAGPlP_FNFE/vWbdvy-5S9RQOkFI6-t70A/edit?utm_content=DAGPlP_FNFE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [UI Design Mockup](https://www.figma.com/design/mHJN72475lnQldMkDJDw3m/Rex?node-id=0-1&t=bq68f3SmkWenZ1fq-1)
- [Database Schema](https://dbdiagram.io/d/Rex-66d51f08eef7e08f0e604e45)

## Hierarchical Software Architecture

### Controllers

This is where the API routes are located for each section of the architecture.

#### Artists

This suite of routes contains all necessary endpoints relating to artists.

`/uploadSong` - The actual file will be uploaded on the frontend, but given a packet of song data from the frontend, this route will create a new Song object.
`/uploadAlbum` - The song files will be uploaded on the frontend, but given a packet of album data from the frontend, this route will create a new Album object and Song objects for all of the songs in the album.
`/registerArtist` - The artist's profile picture will be uploaded on the frontend but this will take in a packet of data and create a new Artist object.

#### Playlists

This suite of routes contains all necessary endpoints relating to playlists.

`/createPlaylist` - The playlist image will be uploaded on the frontend, but given a packet of playlist data from the frontend, this route will create a new Playlist object.
`/addSong` - Given a playlist ID and a song ID, this route will create a new PlaylistSong object.
`/removeSong` -  Given a playlist ID and a song ID, this route will delete the existing PlaylistSong object.
`/followPlaylist` - Given a playlist ID and a user ID, this route will create a new UserFollowedPlaylist object.
`/unfollowPlaylist` - Given a playlist ID and a user ID, this route will delete the existing UserFollowedPlaylist object.
`/deletePlaylist` - Given a playlist ID, this route will delete the existing Playlist object.
`/renamePlaylist` - Given a playlist ID and a new name string, this route will modify the existing Playlist object with the new name.

#### Reviews

This suite of routes contains all necessary endpoints relating to reviews.

`/createReview`
`/deleteReview`
`/createReviewComment`
`/deleteReviewComment`
`/updateReview`
`/getReviewCommentsForReview`
`/getReviewsForRec`

#### Rex

This suite of routes contains all necessary endpoints relating to recs.

`/createRec`
`/deleteRec`
`/getPendingSentRecsForUser`
`/getAcceptedSentRecsForUser`
`/getCompletedSentRecsForUser`
`/getArchivedSentRecsForUser`
`/getPendingReceivedRecsForUser`
`/getCompletedReceivedRecsForUser`
`/getArchivedReceivedRecsForUser`
`/getFeed`
`/archiveRec`
`/acceptRec`
`/completeRec`
`/checkStatusOfRec`

#### Media

This suite of routes contains all necessary endpoints relating to media.

#### Stats

This suite of routes contains all necessary endpoints relating to stats.

#### Users

This suite of routes contains all necessary endpoints relating to users.
