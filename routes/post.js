const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const Post = mongoose.model('Post');
const User = mongoose.model('User');

// get all posts
router.get('/allposts', requireAuth, (req, res) => {
  Post
    .find() // all matching result
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with ref user id, account &　profileImg
    .populate('comments.postedBy', '_id account profileImg')
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
  // check title - length
  if(title.length > 100){
    return res.status(422).json({ error: 'Title must be less than 100 characters' });
  }
  // check content - length
  if(content.length > 1000){
    return res.status(422).json({ error: 'Content must be less than 1000 characters' });
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
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with user model
    .populate('comments.postedBy', '_id account profileImg')
    .sort('-createdAt')
    .then(myPosts => res.json({ myPosts }))
    .catch(console.log);
});

// get all the posts created by my following users
router.get('/followingposts', requireAuth, (req, res) => {
  Post
    .find({ postedBy: {$in: req.user.following} })  // $in: if postedBy = any userId in following []
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with ref user id, account, profileImg
    .populate('comments.postedBy', '_id account profileImg')
    .sort('-createdAt')
    .then(followingPosts => res.json({ followingPosts }))
    .catch(console.log);
});

// get my posts & my following user's posts
router.get('/homeposts', requireAuth, (req, res) => {
  Post
    .find({
      $or: [                                        // logical OR operation
        { postedBy: req.user._id }, 
        { postedBy: {$in: req.user.following} } 
      ]
    })
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with ref user id, account, profileImg
    .populate('comments.postedBy', '_id account profileImg')
    .sort('-createdAt')
    .then(homePosts => res.json({ homePosts }))
    .catch(console.log);
});

// get all the posts that the user has saved
router.get('/saved-posts', requireAuth, (req, res) => {
  Post
    .find({ _id: {$in: req.user.saved} })  // $in: if _id = any postId in saved []
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with ref user id, account, profileImg
    .populate('comments.postedBy', '_id account profileImg')
    .then(savedPosts => res.json({ savedPosts }))
    .catch(console.log);
});

// get all the posts that the user has liked
router.get('/liked-posts', requireAuth, (req, res) => {
  Post
    .find({ _id: {$in: req.user.liked} })  // $in: if _id = any postId in liked []
    .populate('postedBy', '_id account profileImg')
    .populate('comments.postedBy', '_id account profileImg')
    .then(likedPosts => res.json({ likedPosts }))
    .catch(console.log);
});

// get each post
router.get('/eachpost/:postId', requireAuth, (req, res) => {
  Post
    .findOne({ _id: req.params.postId })
    .populate('postedBy', '_id account profileImg') // replace postedBy(only user id) with ref user id, account, profileImg
    .populate('comments.postedBy', '_id account profileImg')
    .then(eachPost => res.json({ eachPost }))
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
        User
          .findByIdAndUpdate(req.user._id, {
            $addToSet: { liked: req.body.postId } 
          }, { new: true })
          .exec((err, likedPostUser) => {
            if(err){
              return res.status(422).json({ error: err });
            }else{
              return res.json({ likedPost, likedPostUser });
            }
          });
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
        User
          .findByIdAndUpdate(req.user._id, {
            $pull: { liked: req.body.postId }
          }, { new: true })
          .exec((err, unlikePostUser) => {
            if(err){
              return res.status(422).json({ error: err });
            }else{
              return res.json({ unlikePost, unlikePostUser });
            }
          });
      }
    })
});

// comment on post
router.put('/comment', requireAuth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  };
  // check comment text - length
  if(comment.text.length > 300){
    return res.status(422).json({ error: 'Comment must be less than 300 characters' });
  }
  Post
    .findByIdAndUpdate(req.body.postId,{
        $push: { comments: comment }            // add item to array
    },{ new: true })
    .populate('comments.postedBy', '_id account profileImg')  // replace postedBy(only user id) with ref user id, account, profileImg
    .populate('postedBy', '_id account profileImg')           // post
    .exec((err, commentedPost) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(commentedPost);
      }
    })
});

// delete the post
router.delete('/deletepost/:postId', requireAuth, (req, res) => {
  Post
    .findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')                // replace name, id with only id
    .exec((err, postToBeDeleted)=>{
      if(err || !postToBeDeleted){
          return res.status(422).json({ error: err })
      }
      // only the person who publishes the post is allowed to delete the post 
      if(postToBeDeleted.postedBy._id.toString() === req.user._id.toString()){  // obj
          postToBeDeleted
            .remove()
            .then(deletedPost => res.json(deletedPost))
            .catch(console.log)
      }
    })
});

// save post
router.put('/save-post', requireAuth, (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, {
      $addToSet: { saved: req.body.postId }    // only add unique item to array
    }, { new: true })
    .exec((err, savedPostUser) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(savedPostUser);
      }
    })
});

// unsave post
router.put('/unsave-post', requireAuth, (req, res) => {
  User
    .findByIdAndUpdate(req.user._id, {
      $pull: { saved: req.body.postId }    // remove item from array
    }, { new: true })
    .exec((err, unsavedPostUser) => {
      if(err){
        return res.status(422).json({ error: err });
      }else{
        return res.json(unsavedPostUser);
      }
    })
});

module.exports = router;
