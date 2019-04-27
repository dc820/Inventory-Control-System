const Device = require('../models/device');
/**
 * Retrieve All Devices From Inventory
 */
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
/**
 * Retrieve Stock Devices From Inventory
 */
exports.getInStockInventory = (req, res, next) => {
  Device.find().where('traffic').equals('Stock')
  .then(result => {
    res.status(200).json({
      message: 'Inbound Inventory Fetched Successfully',
      inStockInventory: result
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Retrieve Devices'
    });
  });
}
/**
 * Retrieve Inbound Devices From Inventory
 */
exports.getInboundInventory = (req, res, next) => {
  Device.find().where('traffic').equals('Inbound')
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
/**
 * Retrieve Outbound Devices From Inventory
 */
exports.getOutboundInventory = (req, res, next) => {
  Device.find().where('traffic').equals('Outbound')
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
/**
 * Add New Device To Inventory
 */
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
/**
 * Update Device In Inventory
 */
exports.updateDevice = (req, res, next) => {
  let devicesToUpdateArr = req.params.idList.split(',');
  let propertiesToUpdate = {};
  if (req.body.condition !== ''){
    propertiesToUpdate.condition = req.body.condtion;
  }
  if (req.body.traffic !== ''){
    propertiesToUpdate.traffic = req.body.traffic;
  }
  if (req.body.rma !== ''){
    propertiesToUpdate.rma = req.body.rma;
  }
  if (req.body.note !== ''){
    propertiesToUpdate.note = req.body.note;
  }
  console.log(devicesToUpdateArr);
  Device.bulkWrite([
    {
      updateMany: {
        filter: {_id: { $in: devicesToUpdateArr}},
        update: propertiesToUpdate
      }
    }
  ])
  .then(updated => {
    console.log(updated);
    if (updated.modifiedCount > 0) {
      res.status(200).json({
        message: 'Update Successful',
        updated: updated
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
/**
 * Delete Device In Inventory
 */
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
