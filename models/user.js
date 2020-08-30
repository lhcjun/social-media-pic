const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// define user schema (define documents in user collection)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    account: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    followers:[{ type: ObjectId, ref: 'User' }],
    following:[{ type: ObjectId, ref: 'User' }]
},{ timestamps: true });

// compile model from schema (a document instance > for creating a new user)
mongoose.model('User', userSchema);