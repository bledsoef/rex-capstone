# Preliminary Software Requirements Specification (SRS)
## Functional requirements
```yaml
Number: 1
Statement: All user data (with the exception of passwords and sensitive information) should be persistently stored in a database (type TBD).
Evaluation Method: If you can create an account, and make some change to your profile, then logout, relogin, and your changes are saved.
Dependency: None.
Priority: Essential, data persistence is integral for a functioning application.
Requirement revision history: None
```

```yaml
Number: 2
Statement: A user must be able to log in or sign up with a username and password.
Evaluation Method: If you can sign up with a username and password, and then login with that username and password at a later time. You should also not be able to register an account already in use.
Dependency: None.
Priority: Essential, there is no point in this application if you cannot build a profile that is secure.
Requirement revision history: None
```

```yaml
Number: 3
Statement: A user must be able to build a "profile" with key information about themselves (name, username, profile picture, potentially a bio, etc.). These should be usable by other Rex users.
Evaluation Method: Upon account creation, you are able to access a personal profile and configure the above information to your liking. You should also be able to search up another user and view their public profile.
Dependency: None.
Priority: High, having a username and password is the most important thing, but for a social media application, having a profile is incredibly useful/important.
Requirement revision history: None
```

```yaml
Number: 4
Statement: A user should be able to look up a song by name.
Evaluation Method: With a fixed amount of "test" songs in the database, verify that searching for the song name prompts you with the correct song. Developing unit testing for this function is also important.
Dependency: None.
Priority: Essential.
Requirement revision history: None
```

```yaml
Number: 5
Statement: Upon finding a song (through any means), the user should be able to play the audio for that song.
Evaluation Method: Through UI, find a song, locate its corresponding mp4 or audio file in the cloud, and verify that the audio played through the application and the direct audio file played are equivalent.
Dependency: None.
Priority: Essential.
Requirement revision history: None
```

```yaml
Number: 6
Statement: A user should be able to send and recieve recommendations (Rex) to their friends and others in their network. A recommendation would include a song, artist, album, or playlist. This would also include a brief description and could also optionally prompt for a review.
Evaluation Method: Unit testing and UI testing of picking a friend, creating a recommendation, and being able to see that recommendation be sent.
Dependency: None.
Priority: Essential.
Requirement revision history: None
```

```yaml
Number: 7
Statement: Users should be able to view the status of their sent recommendations (has it already been listened to?, etc.) 
Evaluation Method: Unit testing and UI testing of sending a recommendation, and then on the receiver's end listening to that track and checking that the sender can see a status update for that recommendation.
Dependency: 6.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 8
Statement: Users should be able to accept, decline (or technically do neither) Rex and these recommendations will then be stored in "accepted" and "declined" Rex sections.
Evaluation Method: Unit testing and UI testing of sending a Rec and then going to the receiver and verifying they can properly accept and decline Rex.
Dependency: 6.
Priority: Esssential.
Requirement revision history: None
```

```yaml
Number: 9
Statement: Users should be able to poke their friends who have not yet checked out their recommendation. 
Evaluation Method: TODO.
Dependency: 6.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 10
Statement: Users should be able to like songs which will place them in a "Liked Songs" list in their library. 
Evaluation Method: TODO.
Dependency: None.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 11
Statement: Users should be able to create playlists and add songs to these playlists. 
Evaluation Method: TODO.
Dependency: None.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 12
Statement: Users should be able to play albums or playlists in their entirety by selecting a song, and then linearly going through the rest of the playlist/album. 
Evaluation Method: TODO.
Dependency: None.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 13
Statement: Users should be able to play albums or playlists on "shuffle" which means it will randomly choose the order of the songs in that playlist.
Evaluation Method: TODO.
Dependency: None.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 14
Statement: Users should be able to "review" recommendations and mark them as completed.
Evaluation Method: TODO.
Dependency: None.
Priority: High.
Requirement revision history: None
```

```yaml
Number: 15
Statement: Users should be able to set a priority on a Rec that will allow them to be reminded after a certain period of time if they have not completed it.
Evaluation Method: TODO.
Dependency: None.
Priority: Medium.
Requirement revision history: None
```

## Non-functional requirements
```yaml
Number: 1
Statement: This application should be available on AT LEAST iOS.
Evaluation Method: Using Expo (a React Native framework) I can simulate the application on my personal iPhone.
Dependency: All functional requirements.
Priority: Essential, as it needs to run on at least platform.
Requirement revision history: None
```

