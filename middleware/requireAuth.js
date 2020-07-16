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
    jwt.verify(token, JWT_SECRET)
};