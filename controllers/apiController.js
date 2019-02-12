const Devices = require('../models/devicesModel');
const bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Search for Devices From Inventory    WORK IN PROGRESS
    app.get('/search?q=:q', function(req, res){
        Devices.find(function(err, result){
            if (err) throw err;
            res.send('Success');
        });
    });  

    //List All Devices From Inventory
    app.post('/api/getInventory', function(req, res){
        Devices.find(function(err, result){
            if (err) throw err;
            res.send(result);
        });
    });        

    //Add New Devices to Inventory - Need to Retrieve Device Object From Client
    app.post('/api/addDevice', function (req, res){

        Devices.create({ "status": req.body.status, "part": req.body.part, "type": req.body.type, "manufacturer": req.body.manufacturer, "model": req.body.model, "serial": req.body.serial, "rma": req.body.rma, "note": req.body.note }, 
        function(err, result){
            if (err)  throw err;
            res.send('Success');
        });       
    });

    //Find Device by _ID and Update
    app.post('/api/editDevice', function (req, res){
        Devices.findByIdAndUpdate(req.body._id, { "status": req.body.status, "part": req.body.part, "type": req.body.type, "manufacturer": req.body.manufacturer, "model": req.body.model, "serial": req.body.serial, "rma": req.body.rma, "note": req.body.note }, 
        function(err, result){
            res.send('Success');
        });
    });

    //Delete Device By _ID
    app.post('/api/deleteDevice', function (req, res){
        Devices.findByIdAndDelete(req.body._id, function(err, result){
            res.send('Success');
        });
    });
}