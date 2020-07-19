const mongoose = require('mongoose');

// define user schema (define documents in user collection)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
});

// compile model from schema (a document instance > for creating a new user)
mongoose.model('User', userSchema);