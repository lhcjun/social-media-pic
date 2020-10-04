const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/public_key');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('combined')); // HTTP req logger  

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

// mongoose.model
require('./models/user');
require('./models/post');

app.use(express.json());
// express.Router()
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


// deploy to production
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    const compression = require("compression");
    const enforce = require("express-sslify");

    // for gzipping on heroku (add compress/gzip to server, for gzipping the build file size that sended from server)
    app.use(compression());

    // PWA - https (redirect http to https)
    app.use(enforce.HTTPS({ trustProtoHeader: true }));

    // serve the static files(html, css, js) that inside client/build folder to express server 
    app.use(express.static('client/build'));
    // client side makes any req(hit all routes) > serve client with html in client/build folder 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

// PWA - service worker
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});