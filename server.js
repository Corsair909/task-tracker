const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// Connection EE
mongoose.connection.on('connected', (err) => {
    console.log('----------Connected to database--------');
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || '3000';

// CORS Middleware
app.use(cors());

// Angular DIST folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport mw
app.use(passport.initialize());
app.use(passport.session());

// passport functionality
require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'dist/index.html'));
});

// run server
app.listen(port, () => {
    console.log('Server started on ' + port);
});