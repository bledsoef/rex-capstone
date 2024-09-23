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

`/uploadSong` - POST: The actual file will be uploaded on the frontend, but given a packet of song data from the frontend, this route will create a new Song object.

`/uploadAlbum` - POST: The song files will be uploaded on the frontend, but given a packet of album data from the frontend, this route will create a new Album object and Song objects for all of the songs in the album.

`/registerArtist` - POST: The artist's profile picture will be uploaded on the frontend but this will take in a packet of data and create a new Artist object.

#### Playlists

This suite of routes contains all necessary endpoints relating to playlists.

`/createPlaylist` - POST: The playlist image will be uploaded on the frontend, but given a packet of playlist data from the frontend, this route will create a new Playlist object.

`/addSong` - POST: Given a playlist ID and a song ID, this route will create a new PlaylistSong object.

`/removeSong` -  POST: Given a playlist ID and a song ID, this route will delete the existing PlaylistSong object.

`/followPlaylist` - POST: Given a playlist ID and a user ID, this route will create a new UserFollowedPlaylist object.

`/unfollowPlaylist` - POST: Given a playlist ID and a user ID, this route will delete the existing UserFollowedPlaylist object.

`/deletePlaylist` - POST: Given a playlist ID, this route will delete the existing Playlist object.

`/renamePlaylist` - POST: Given a playlist ID and a new name string, this route will modify the existing Playlist object with the new name.

`/getPlaylistsForUser` - GET: Given a user ID, get all UserFollowedPlaylists that have that user ID or Playlist object that has that creator.

#### Reviews

This suite of routes contains all necessary endpoints relating to reviews.

`/createReview` - POST: Given a data packet containing the review data (rating, comment, rec_id, creator), this route will create a new Review object.

`/deleteReview` - POST: Given a review ID, this route will delete an existing Review object. 

`/createReviewComment` - POST: Given a data packet containing the review comment data (comment, review_id, creator), this route will create a ReviewComment object. 

`/deleteReviewComment` - POST: Given a review comment ID, this route will delete an existing ReviewComment object. 

`/updateReview` - POST: Given the review ID and a packet containing the new information, modify the existing Review object.

`/getReviewCommentsForReview`- GET: Given a review ID, return all comments with that review_id field.

`/getReviewsForRec` - GET: Given a rec ID, return all reviews that point to that rec_id.

#### Rex

This suite of routes contains all necessary endpoints relating to recs.

`/createRec` - POST: Given a packet of data, use that to create a new Rec object in the DB.

`/deleteRec` - POST: Given a rec ID, delete the existing Rec Object.

`/getPendingSentRecsForUser` - GET: Given a rec ID, return all data about it. This includes the current progress, status, etc.

`/getPendingSentRecsForUser` - GET: Given a user ID, return all pending recs they have sent which contain the user ID in the sender_id field.

`/getCompletedSentRecsForUser` - GET: Given a user ID, return all completed recs they have sent which contain the user ID in the sender_id field.

`/getArchivedSentRecsForUser` - GET: Given a user ID, return all archived recs they have sent which contain the user ID in the sender_id field.

`/getSentRecsForUser` - GET: Given a user ID, return all recs they have sent which contain the user ID in the sender_id field.

`/getPendingReceivedRecsForUser` - GET: Given a user ID, return all pending recs they have recieved which contain the user ID in the recipient_id field.

`/getCompletedReceivedRecsForUser` - GET: Given a user ID, return all completed recs they have recieved which contain the user ID in the recipient_id field.

`/getArchivedReceivedRecsForUser` - GET: Given a user ID, return all archived recs they have recieved which contain the user ID in the recipient_id field.

`/getReceivedRecsForUser` - GET: Given a user ID, return all recs they have recieved which contain the user ID in the recipient_id field.

`/getFeedForUser` - GET: Given a user ID, return all recs posted (where is_post is set to True) in the last week that the user has not seen.

`/archiveRec` - POST: Given a rec ID, delete the current PendingRec object and create a new ArchivedRec object with the rec ID.

`/completeRec` - POST: Given a rec ID, delete the current PendingRec object and create a new CompletedRec object with the rec ID.

#### Media

This suite of routes contains all necessary endpoints relating to media.

#### Stats

This suite of routes contains all necessary endpoints relating to stats.

**TBD**

#### Users

This suite of routes contains all necessary endpoints relating to users.
