const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const { JWT_SECRET } = require('../config/public_key');


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // no auth headers > block the request for going to the next step
    if(!authorization){
        return res.status(401).json({ error: 'Not logged in' });
    }
    // extract token from Bearer format(Bearer + JWT token)
    const token = authorization.replace('Bearer ', '')    // authorization === Bearer token123
    // verify token
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // extract userId from token > get user data > assign to req.user
        const { _id } = payload;        // /signin > jwt.sign({ _id })  payload
        User
          .findById(_id)
          .then(userData => {
            // assign userData to req.user
            req.user = userData;
            next();
          })
          .catch(console.log);
    })
};