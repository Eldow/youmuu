# Youmuu
Share your music with friends

# Getting started
## Prerequisites
Make sure you have NodeJS, npm and mongoDB installed.
Once you've clonned the git repo, start an instance of mongoDB.
The API is using the default MongoDB port (`mongodb://localhost:27017`). You can change it manually in the `server.js` file.
## Installing
Install node modules
```
npm install
```
Build Youmuu's web client
```
ng build
```
Launch Youmuu's API & Serve files
```
node server
```

# Features
Authenticate by email or with your facebook or twitter account via Auth0 and Lock.
Look for youtube videos using the Youtube v3 API.
Start creating, listening and sharing playlists with your friends.

# Built with
## Client
* [Angular 4](https://angular.io/) - The web framework used
* [Bootstrap 4 Alpha](https://angular.io/) - Lux's bootswatch
## Server
* [NodeJS](https://nodejs.org/) - Javascript runtime
* [ExpressJS](https://expressjs.com/) - Helps to define the server's routes
* [MongooseJS](http://mongoosejs.com/) - Defines models and interacts with the database
