const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
  traffic: { type: String, required: true },
  condition: { type: String, required: true },
  type: { type: String, required: true },
  model: String,
  brand: String,
  serial: String,
  rma: String,
  note: String,
  time: Date,
  user: String,
  change: String // Added, Edit, Removed
});

module.exports = mongoose.model('Audit', auditSchema);
