const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
  _id: String,
  status: String,
  type: String,
  model: String,
  manufacturer: String,
  serial: String,
  rma: String,
  note: String
});

const Devices = mongoose.model('Devices', devicesSchema);

module.exports = Devices;
