# Design
## Flow of Operations
Streaming Platform - User Experience: https://www.canva.com/design/DAGPlP_FNFE/vWbdvy-5S9RQOkFI6-t70A/edit?ui=eyJEIjp7IlQiOnsiQSI6IlBCNkJQMkpZTHJYTERKbDcifX19

## Tech Stack
https://www.canva.com/design/DAGPlP_FNFE/vWbdvy-5S9RQOkFI6-t70A/edit?utm_content=DAGPlP_FNFE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## UI Design Mockup
https://www.figma.com/design/mHJN72475lnQldMkDJDw3m/Rex?node-id=0-1&t=bq68f3SmkWenZ1fq-1

## Database Schema
https://dbdiagram.io/d/Rex-66d51f08eef7e08f0e604e45

## Hierarchical Software Architecture

### Controllers

This is where the API routes are located for each section of the architecture.

#### Artists

This suite of routes contains all necessary endpoints relating to artists.

`/uploadSong`
`/registerArtist`

#### Playlists

This suite of routes contains all necessary endpoints relating to playlists.

`/createPlaylist`
`/addSong`
`/removeSong`
`/followPlaylist`
`/unfollowPlaylist`
`/deletePlaylist`
`/renamePlaylist`

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
`/getAcceptedReceivedRecsForUser`
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

### Logic

#### Artists

This suite of routes contains all necessary endpoints relating to artists.

#### Playlists

This suite of routes contains all necessary endpoints relating to playlists.

#### Reviews

This suite of routes contains all necessary endpoints relating to reviews.

#### Rex

This suite of routes contains all necessary endpoints relating to recs.

#### Media

This suite of routes contains all necessary endpoints relating to media.

#### Stats

This suite of routes contains all necessary endpoints relating to stats.

#### Users

This suite of routes contains all necessary endpoints relating to users.

### Models
