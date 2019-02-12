const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devicesSchema = new Schema({
    status: String,
    part: String,
    type: String,
    manufacturer: String,
    model: String,
    serial: String,
    rma: String,
    note: String
});

const Devices = mongoose.model('Devices', devicesSchema);

module.exports = Devices;