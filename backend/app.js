const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiController = require('./controllers/apiController');

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true });

apiController(app);

module.exports = app;
