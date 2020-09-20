const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const Post = mongoose.model('Post');
const User = mongoose.model('User');

// get profile page of other users
router.get('/user/:id', requireAuth, (req, res) => {
  // find user by user id
  User
    .findOne({ _id: req.params.id })
    .select('-password')                          // not sending password to frontend
    .then(user => {
        // find all the posts posted by the user with user id
        Post
          .find({ postedBy: req.params.id })
          .populate('postedBy', '_id name')       // replace postedBy(only user id) with ref user id, name
          .exec((err, posts) => {
            if(err){
                return res.status(422).json({ error: err })
            }
            res.json({ user, posts })
        })
    })
    .catch(err => res.status(404).json({ error: 'User not found' }))
});

// follow new user
router.put('/follow', requireAuth, (req, res)=>{
  // find the user to be followed by userId > add sign in user(unique) into followers array
  User
    .findByIdAndUpdate(req.body.followedId, {   
      $addToSet: { followers: req.user._id }      // only add unique item to array
    }, { new: true })
    .exec((err, followedUser) => {                // mongoose query callback
      if(err){
        return res.status(422).json({ error: err })
      }
      // find the follower by userId(requireAuth) > add followed user(unique) into following array
      User
        .findByIdAndUpdate(req.user._id, {
          $addToSet: { following: req.body.followedId }        
        }, { new: true })
        .select('-password')
        .then(followerUser => {
          res.json(followerUser);
        })
        .catch(err => res.status(422).json({ error: err }));
    })
});

// unfollow a user
router.put('/unfollow', requireAuth, (req, res)=>{
  // find the user to be unfollowed by userId > remove sign in user(unique) from followers array
  User
    .findByIdAndUpdate(req.body.unfollowedId, {   
      $pull: { followers: req.user._id }            // remove item from array
    }, { new: true })
    .exec((err, unfollowedUser) => {                // mongoose query callback
      if(err){
        return res.status(422).json({ error: err })
      }
      // find the unfollower by userId(requireAuth) > remove followed user(unique) from following array
      User
        .findByIdAndUpdate(req.user._id, {
          $pull: { following: req.body.unfollowedId }        
        }, { new: true })
        .select('-password')
        .then(unfollowerUser => {
          res.json(unfollowerUser);
        })
        .catch(err => res.status(422).json({ error: err }));
    })
});

// update profile img
router.put('/update-avatar', requireAuth, (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, {
      $set: { profileImg: req.body.profileImg }     //  replaces with the specified value
    }, { new: true })
    .exec((err, updatedUser) => { 
      if(err){
          return res.status(422).json({ error: 'avatar posting error' })
      }
      res.json(updatedUser);
    })
});

// update user profile (bio, name)
router.put('/update-profile', requireAuth, (req, res) => {
  const { name, bio } = req.body.formInput;

  User
    .findByIdAndUpdate(req.user._id, {
      $set: { bio, name }                            //  replaces with the specified value (bio: bio)
    }, { new: true })
    .exec((err, updatedUser) => { 
      if(err){
          return res.status(422).json({ error: 'profile updating error: ', err })
      }
      res.json(updatedUser);
    })
});


// search users
router.post('/search-users', (req, res) => {
  // the pattern used for query (^ start with)
  let userPattern = new RegExp('^' + req.body.query);
  User    
    .find({
      $or: [                                                // logical OR operation
        { name: { $regex: userPattern, $options: 'i' } },   // $regex = use regex pattern to match strings (in db)
        { account: { $regex: userPattern, $options: 'i' } } // $options i = insensitivity to match both upper and lower cases
      ]
    })
    .select('_id name account profileImg')
    .then(users => res.json({users}))
    .catch(console.log);
});

module.exports = router;
