const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/public_key');

const router = express.Router();
const User = mongoose.model('User');


router.get('/protected', (req, res) => {
  res.send('hello user')
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: 'Incorrect form submission' });
  }
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
            const user = new User({ name, email, password: hashedPassword });
            user
              .save()
              .then(user =>
                res.status(200).json({ message: 'User successfully saved' })
              )
              .catch(console.log);
        });
    })
    .catch(console.log);
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({ error: 'Incorrect form submission' });
    }
    User
      .findOne({ email: email })
      .then(savedUser => {
        // check email
        if(!savedUser){
            return res.status(422).json({ error: 'Invalid email or password' });
        }
        // check password
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {          // return boolean value (match or not)
                if(doMatch){
                    // successfully signed in
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET); // _id = from MongoDB
                    res.json({ token })
                }
                return res.status(422).json({ error: 'Invalid email or password' });
            })
            .catch(console.log)
      })
      .catch(console.log);
});

module.exports = router;
