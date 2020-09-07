const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/public_key');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const User = mongoose.model('User');


// sign up
router.post('/signup', (req, res) => {
  const { name, account, email, password } = req.body;
  // Incorrect form submission
  if (!email || !password || !name || !account) {
    return res.status(422).json({ error: 'Please fill in your details' });
  }
  // check email - regex email format validation
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailRegex.test(email)){
    return res.status(422).json({ error: 'Invalid Email Format' });
  }
  // check account - length & regex 
  if(account.length < 6 || account.length > 16){
    return res.status(422).json({ error: 'Username must be 6 ~ 16 characters' });
  }
  const accountRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  if(!accountRegex.test(account)){
    return res.status(422).json({ error: 'Invalid Username Format (try letters or _ .)' });
  }
  // check password - length
  if(password.length < 6 || password.length > 20){
    return res.status(422).json({ error: 'Password must be 6 ~ 20 characters' });
  }
  // check name - length
  if(name.length > 30){
    return res.status(422).json({ error: 'Name must be less than 30 characters' });
  }
  // check exist account & email
  User
    .findOne({ account: account })
    .then(sameAccountUser => {
      if (sameAccountUser) {
        return res.status(422).json({ error: 'Username already exists' });
      }
      // create new user
      User
        .findOne({ email: email })
        .then(savedUser => {
          if (savedUser) {
            return res.status(422).json({ error: 'Email already exists' });
          }
          // hash passwords
          bcrypt.hash(password, 10)
            .then(hashedPassword => {
                // create new user if email doesn't exist
                const newUser = new User({ name, account, email, password: hashedPassword });
                newUser
                  .save()
                  .then(user => {
                    // successfully signed up
                    const token = jwt.sign({ _id: user._id }, JWT_SECRET);      // _id = from MongoDB
                    const { _id, name, account, email, followers, following, profileImg, bio } = user;
                    return res.json({ token, user: { _id, name, account, email, followers, following, profileImg, bio } });
                    // res.status(200).json({ message: 'User successfully saved' })
                  })
                  .catch(console.log);
            });
        })
        .catch(console.log);
    })
    .catch(console.log);
});

// sign in
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({ error: 'Please fill in your details' });
    }
    User
      .findOne({ email: email })
      .then(savedUser => {
        // check email
        if(!savedUser){
            return res.status(422).json({ error: 'Incorrect email or password' });
        }
        // check password
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {          // return boolean value (match or not)
                if(doMatch){
                    // successfully signed in
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET); // _id = from MongoDB
                    const { _id, name, account, email, followers, following, profileImg, bio } = savedUser;
                    return res.json({ token, user: { _id, name, account, email, followers, following, profileImg, bio } });
                }
                return res.status(422).json({ error: 'Incorrect email or password' });
            })
            .catch(console.log)
      })
      .catch(console.log);
});

module.exports = router;
