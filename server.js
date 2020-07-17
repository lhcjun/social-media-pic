const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/public_key');

require('./models/user');


const PORT = process.env.PORT || 5000;
const app = express();

// connect to db
mongoose.connect(MONGO_URI, {    // options for deprecation warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
// connection success
db.on('connected', () => {
    console.log('successfully connecting to MongoDB')
});
// connection errors
db.on('error', error => {
    console.log('MongoDB connection error', error)
});

app.use(express.json());
app.use(require('./routes/auth'));


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
