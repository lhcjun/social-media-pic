const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.send('Hello')
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if(!email || !password || !name){
        return res.status(422).json({ error: 'Incorrect form submission' });
    }
    User
        .findOne({ email: email })
        .then(savedUser => {
            if(savedUser){
                return res.status(422).json({ error: 'Email already exists' });
            }
            // create new user if email doesn't exist
            const user = new User({ name, email, password })
            user.save()
                .then(user => res.status(200).json({ message: 'User successfully saved' }))
                .catch(console.log)
        })
        .catch(console.log)

});

module.exports = router;