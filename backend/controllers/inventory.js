const Device = require('../models/device');
// Search Functionality
exports.searchInventory = (req, res, next) => {
  console.log(req.query.q);
  Device.find().or([{ condition: {$regex: req.query.q } }, { traffic: {$regex: req.query.q } }, { type: {$regex: req.query.q } } ])
  .then(result => {
    res.status(200).json({
      query: result
    })
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Search Failed'
    })
  });
}
// Retrieve All Devices From Inventory
exports.getAllInventory = (req, res, next) => {
  let uniqueModels = [];
  let deviceGroups = [];
  Device.find()
  .then(result => {
    result.forEach((device) => {
      if (!uniqueModels.includes(device.model)) {
        uniqueModels.push(device.model);
        deviceGroups.push({ model: device.model, brand: device.brand, type: device.type });
      }
    });
    console.log(deviceGroups);
    res.status(200).json({
      message: 'All Inventory Fetched Successfully',
      allInventory: result,
      uniqueModels: uniqueModels,
      deviceGroups: deviceGroups
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
};
// Don't Think This Will Be Needed <----------------
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
// Don't Think This Will Be Needed <----------------
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
// Add New Device To Inventory
exports.createDevice = (req, res, next) => {
  const device = new Device({
    traffic: req.body.traffic,
    condition: req.body.condition,
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
// Update Device In Inventory
exports.updateDevice = (req, res, next) => {
  const device = new Device({
    _id: req.params.id,
    traffic: req.body.traffic,
    condition: req.body.condition,
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
// Delete Device In Inventory
exports.deleteDevice = (req, res, next) => {
  console.log('Params Here');
  console.log(req.params.idList);
  let devicesToDeleteArr = req.params.idList.split(',');
  console.log(devicesToDeleteArr);

  Device.deleteMany( { _id: {$in: devicesToDeleteArr}} )
  .then(document => {
    if (document.n > 0) {
      res.status(200).json({
        message: 'Delete Successful',
        devicesDeleted: document
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
