const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
// Create a user
.post(function(req, res) {
  var user = new User();
  user = new User(req.body);
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
  });
})

router.route('/:name')
// Get users by search
.get(function(req, res) {
  User.find({ name: { "$regex": req.params.name, "$options": "i" } }, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});


module.exports = router;
