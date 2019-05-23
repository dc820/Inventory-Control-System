const express = require('express');
const app = express();
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory');
const userRoutes = require('./routes/user');

// Connect To MongoDB Database
mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true });

app.use('/assets', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cross-Origin Resource Sharing
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
    '*'
  );
  next();
});
// API Endpoints
app.use('/api/inventory', inventoryRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
