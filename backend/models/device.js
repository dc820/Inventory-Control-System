const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  traffic: { type: String, required: true },
  condition: { type: String, required: true },
  type: { type: String, required: true },
  model: String,
  brand: String,
  serial: String,
  rma: String,
  note: String,
});

module.exports = mongoose.model('Device', deviceSchema);
