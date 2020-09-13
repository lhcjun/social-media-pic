const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// define user schema (define documents in user collection)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    account: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { 
        type: String, 
        default: 'https://res.cloudinary.com/jl/image/upload/v1599417228/default_user_dcgcsm.png' 
    },
    bio: { type: String },
    followers: [{ type: ObjectId, ref: 'User' }],
    following: [{ type: ObjectId, ref: 'User' }],
    resetToken: String,
    expireToken: Date
},{ timestamps: true });

// compile model from schema (a document instance > for creating a new user)
mongoose.model('User', userSchema);