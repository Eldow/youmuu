//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
var User = require('./user.js');

var PlaylistSchema = new Schema({
    name: String,
    owner: { name: { type: String }, userId: { type: String } },
    shared: [{ name: { type: String }, userId: { type: String } }],
    videos: [{ videoId: { type: String}, title: { type: String}, thumbnail: { type: String }}],
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Playlist', PlaylistSchema );
