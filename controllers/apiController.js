const Devices = require('../models/devicesModel');
const bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //List All Devices From Inventory
    app.post('/api/getInventory', function(req, res){
        Devices.find(function(err, result){
            if (err) throw err;
            res.send(result);
        });
    });        

    var addDevice = [
        {
            status: 'Outbound',
            part: 'Spare',
            type: 'Router',
            manufacturer: 'Cisco',
            model: 'ISR-4331',
            serial: 'FDO1837EABC',
            rma: '8586524389',
            note: 'defective'
        }
    ];

    //Add New Devices to Inventory - Need to Retrieve Device Object From Client
    app.post('/api/addDevice', function (req, res){
        Devices.create(addDevice, function(err, result){
            if (err)  throw err;
            res.send(result);
        });       
    });

    //app.post('/api/editDevice')

    //Delete Device By _ID
    app.post('/api/deleteDevice', function (req, res){
        Devices.findByIdAndDelete('Insert _ID String', function(err, result){
            res.send(result);
        });
    });
}