const express = require('express');
const app = express();
const mongoose = require('mongoose');

const inventoryRoutes = require('./routes/inventory');

mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true });

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'
  );
  next();
});

app.use('/api/inventory', inventoryRoutes);

module.exports = app;
