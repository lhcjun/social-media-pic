const mongoose = require('mongoose');

// define user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
});

// compile model from schema
mongoose.model('User', userSchema);