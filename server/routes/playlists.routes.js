const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');

router.route('/')
.get(function(req, res) {
  res.json({ message: 'Playlist API' });
})
// Create a playlist
.post(function(req, res) {
  var playlist = new Playlist(req.body);
  playlist.save(function(err, createdPlaylist) {
    if (err)
      return res.send(err);
    res.json({ message: 'Playlist created!', playlist: createdPlaylist });
  });
})

router.route('/:id')
// Get a playlist
.get(function(req, res) {
  Playlist.findById(req.params.id, function(err, playlist) {
    if (err)
      res.send(err);
    res.json(playlist);
  });
})
// Modify a playlist
.put(function(req, res) {
  Playlist.findById(req.params.id, function(err, playlist) {
    if (err)
      res.send(err);
    playlist.videos = req.body.videos;
    playlist.shared = req.body.shared;
    playlist.name = req.body.name;
    playlist.updated = Date.now();
    playlist.save(function(err) {
      if (err)
        return res.send(err);
      res.json({ message: 'Playlist updated' });
    });
  });
})
// Delete a playlist
.delete(function(req, res) {
  Playlist.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Playlist deleted' });
  });
});

// Get my playlists
router.route('/owned/:owner')
.get(function(req, res) {
  Playlist.find({ 'owner.userId': req.params.owner }, function(err, playlist) {
    if (err)
      res.send(err);
    res.json(playlist);
  });
});

// Get the playlists people shared with me
router.route('/shared/:owner')
.get(function(req, res) {
  Playlist.find({ 'shared.userId': req.params.owner }, function(err, playlist) {
    if (err)
      res.send(err);
    res.json(playlist);
  });
});

module.exports = router;
