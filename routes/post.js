const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const Post = mongoose.model('Post');

// get all posts
router.get('/allposts', requireAuth, (req, res) => {
  Post
    .find() // all matching result
    .populate('postedBy', '_id name') // replace postedBy(only user id) with ref user id, name
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then(allPosts => res.json({ allPosts }))
    .catch(console.log);
});

// create a new post
router.post('/createpost', requireAuth, (req, res) => {
  const { title, content, imgURL } = req.body;
  if (!title || !content || !imgURL) {
    return res.status(422).json({ error: 'Please add some details to the post' }); // Incorrect form submission
  }
  // remove password (when created new post)
  req.user.password = undefined;
  // create new post
  const newPost = new Post({
    title,
    content,
    photo: imgURL,
    postedBy: req.user,
  });
  newPost
    .save()
    .then(result => res.status(200).json({ post: result }))
    .catch(console.log);
});

// get all the posts created by the user
router.get('/myposts', requireAuth, (req, res) => {
  Post
    .find({ postedBy: req.user._id })
    .populate('postedBy', '_id name') // replace postedBy(only user id) with user model
    .sort('-createdAt')
    .then(myPosts => res.json({ myPosts }))
    .catch(console.log);
});

// like post
router.put('/like', requireAuth, (req, res) => {
  Post
    .findByIdAndUpdate(req.body.postId, {
      $addToSet: { likes: req.user._id }    // only add unique item to array
    }, { new: true })
    .exec((err, likedPost) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(likedPost);
      }
    })
});

// unlike post
router.put('/unlike', requireAuth, (req, res) => {
  Post
    .findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }        // remove item from array
    }, { new: true })
    .exec((err, unlikePost) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(unlikePost);
      }
    })
});

// comment on post
router.put('/comment', requireAuth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  };

  Post
    .findByIdAndUpdate(req.body.postId,{
        $push: { comments: comment }            // add item to array
    },{ new: true })
    .populate('comments.postedBy', '_id name')  // replace postedBy(only user id) with ref user id, name
    .populate('postedBy', '_id name')           // post
    .exec((err, commentedPost) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(commentedPost);
      }
    })
});

module.exports = router;
