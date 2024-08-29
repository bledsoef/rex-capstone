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

## Non-functional requirements
```yaml
Number: 1
Statement: This application should be available on AT LEAST iOS.
Evaluation Method: Using Expo (a React Native framework) I can simulate the application on my personal iPhone.
Dependency: All functional requirements.
Priority: Essential, as it needs to run on at least platform.
Requirement revision history: None
```

