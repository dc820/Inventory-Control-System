const Device = require('../models/device');

exports.searchInventory = (req, res, next) => {
  console.log(req.query.q);

  Device.find().or([{ status: {$regex: req.query.q } }, { part: {$regex: req.query.q } }, { type: {$regex: req.query.q } } ])
  .then(result => {
    res.status(200).json({
      query: result
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Search Failed'
    })
  });
}

exports.getAllInventory = (req, res, next) => {
  Device.find()
  .then(result => {
    res.status(200).json({
      message: 'All Inventory Fetched Successfully',
      allInventory: result
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
};

exports.getInboundInventory = (req, res, next) => {
  Device.find().where('status').equals('Inbound')
  .then(result => {
    res.status(200).json({
      message: 'Inbound Inventory Fetched Successfully',
      inboundInventory: result
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
}

exports.getOutboundInventory = (req, res, next) => {
  Device.find().where('status').equals('Outbound')
  .then(result => {
    res.status(200).json({
      message: 'Outbound Inventory Fetched Successfully',
      outboundInventory: result
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
}

exports.createDevice = (req, res, next) => {
  const device = new Device({
    status: req.body.status,
    part: req.body.part,
    type: req.body.type,
    brand: req.body.brand,
    model: req.body.model,
    serial: req.body.serial,
    rma: req.body.rma,
    note: req.body.note
    // Specify Minimum?
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
    brand: req.body.brand,
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
