const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const Post = mongoose.model('Post');
const User = mongoose.model('User');

// get profile page of other users
router.get('/user/:id', requireAuth, (req, res) => {
  // find user by user id
  User.findOne({ _id: req.params.id })
    .select('-password') // not sending password to frontend
    .then((user) => {
      // find all the posts posted by the user with user id
      Post.find({ postedBy: req.params.id })
        .populate('postedBy', '_id name') // replace postedBy(only user id) with ref user id, name
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => res.status(404).json({ error: 'User not found' }));
});

// follow new user
router.put('/follow', requireAuth, (req, res) => {
  // find the user to be followed by userId > add unique user into followers array
  User.findByIdAndUpdate(
    req.body.followedId,
    {
      $addToSet: { followers: req.user._id }, // only add unique item to array
    },
    { new: true }
  );
});

module.exports = router;
