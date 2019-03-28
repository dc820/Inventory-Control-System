const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  status: { type: String, required: true },
  part: { type: String, required: true },
  type: { type: String, required: true },
  model: String,
  manufacturer: String,
  serial: String,
  rma: String,
  note: String,
  mimimum: String
});

module.exports = mongoose.model('Device', deviceSchema);
