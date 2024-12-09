# Installation
## Necessary hardware requirements
- Running a macOS system with a built in iOS simulator
- Running at least macOS Sonoma 14.5

## Downloading Expo
- Expo is a React Native platform to help with development and deployment and necessary to run this application.
- Make sure you have Node.js installed so you can install expo with npx
- npm install expo

## Run the frontend server
- Navigate into the `/codebase/rex-react-native` directory
- Run `npx expo start -c` and when prompted, select `i` to boot up the simulator.

## Configuring the backend environment
- I used a PostgreSQL database for this application so it will be necessary to setup the database locally
- Install and configure a local postgres db here: https://www.postgresql.org/download/
- If you are prompted to set a username or password, use postgresql as the username and no password.
- Navigate into `/codebase/rex-backend`
- Run `source setup.sh` to create the Python virtual environment and install all necessary packages
- Run `./database/reset_database.sh` which will likely throw an expected error. If you run it again there will be no error.
- Now run `python3 main.py` to get the backend server running

## Use cases
- Searching and playing music
- Creating playlists and categorizing your music
- Sharing and recommending music to other users on the platform
- Reviewing and discussing music with other users.
