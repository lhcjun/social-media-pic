const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;     //

// define post schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    photo: { type: String, default: 'no photo' },    // url  required: true
    postedBy: { type: ObjectId, ref: 'User' }        // relate post model & user model
});

// compile model from schema
mongoose.model('Post', postSchema);
