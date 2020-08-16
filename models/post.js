const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// define post schema (define documents in post collection)
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true }, // url
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{ text: String, postedBy: { type: ObjectId, ref: 'User' } }],
    postedBy: { type: ObjectId, ref: 'User' }, // relate post model & user model
  },
  { timestamps: true }
);

// compile model from schema (a document instance > for creating a new post)
mongoose.model('Post', postSchema);
