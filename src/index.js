'use strict'
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const app = express();


// settings
app.set('port', process.env.PORT || 40000);

// middlewares
app.use (helmet());// Header security
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// routes
app.use('/faceRecognition', require('./routes/routes'));

// static files
app.use(express.static(__dirname + '/public'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
module.exports = app

