const Device = require('../models/device');

exports.getInventory =  (req, res, next) => {
  Device.find()
  .then(documents => {
    res.status(200).json({
      message: 'Inventory Fetched',
      devices: documents,
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
};

exports.createDevice = (req, res, next) => {
  const device = new Device({
    status: req.body.status,
    part: req.body.part,
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    serial: req.body.serial,
    rma: req.body.rma,
    note: req.body.note
  });
  device.save()
  .then(document => {
    res.status(201).json({
      message: 'Device Added Successfully',
      deviceId: document.id
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Add Device To Inventory'
    });
  });
}

exports.updateDevice = (req, res, next) => {
  const device = new Device({
    _id: req.params.id,
    status: req.body.status,
    part: req.body.part,
    type: req.body.type,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    serial: req.body.serial,
    rma: req.body.rma,
    note: req.body.note
  });
  Device.updateOne({ _id: req.params.id }, device)
  .then(document => {
    if (document.n > 0) {
      res.status(200).json({
        message: 'Update Successful',
        device: document
      });
    } else {
      res.status(401).json({
        message: 'Not Authorized'
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Update Device In Inventory'
    })
  });
}

exports.deleteDevice = (req, res, next) => {
  Device.deleteOne( { _id: req.params.id} )
  .then(document => {
    if (document.n > 0) {
      res.status(200).json({
        message: 'Delete Successful',
        deviceDeleted: document
      });
    } else {
      res.status(401).json({
        message: 'Not Authorized'
      });
    }
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message: 'Could Not Delete Device From Inventory'
    });
  });
}
