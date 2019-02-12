const express = require('express');
const app = express();
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const apiController = require('./controllers/apiController');
const port = process.env.PORT || 3000;

// view engine setup
app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true });

apiController(app);

app.listen(port);