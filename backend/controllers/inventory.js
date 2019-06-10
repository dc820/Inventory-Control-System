const Device = require('../models/device');
const Audit = require('../models/audit');

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
 * Retrieve In Stock Devices From Inventory
 */
exports.getInStockInventory = (req, res, next) => {
  Device.find().where('traffic').equals('In Stock')
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

  const addToAudit = new Audit({
    traffic: req.body.traffic,
    condition: req.body.condition,
    type: req.body.type,
    brand: req.body.brand,
    model: req.body.model,
    serial: req.body.serial,
    rma: req.body.rma,
    note: req.body.note,
    time: new Date(),
    user: req.body.user,
    change: 'Added'
  });
  addToAudit.save();
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
  if (req.body.condition !== '') {
    propertiesToUpdate.condition = req.body.condition;
  }
  if (req.body.traffic !== '') {
    propertiesToUpdate.traffic = req.body.traffic;
  }
  if (req.body.rma !== '') {
    propertiesToUpdate.rma = req.body.rma;
  }
  if (req.body.note !== '') {
    propertiesToUpdate.note = req.body.note;
  }

  devicesToUpdateArr.forEach(id => {
    Device.findOne().where('_id').equals(id)
      .then(result => {
        if (req.body.condition !== '') {
          propertiesToUpdate.condition = req.body.condition;
        } else {
          propertiesToUpdate.condition = result.condition;
        }
        if (req.body.traffic !== '') {
          propertiesToUpdate.traffic = req.body.traffic;
        } else {
          propertiesToUpdate.traffic = result.traffic;
        }
        if (req.body.rma !== '') {
          propertiesToUpdate.rma = req.body.rma;
        } else {
          propertiesToUpdate.rma = result.rma;
        }
        if (req.body.note !== '') {
          propertiesToUpdate.note = req.body.note;
        } else {
          propertiesToUpdate.note = result.note;
        }

        const addToAudit = new Audit({
          traffic: propertiesToUpdate.traffic,
          condition: propertiesToUpdate.condition,
          type: result.type,
          brand: result.brand,
          model: result.model,
          serial: result.serial,
          rma: propertiesToUpdate.rma,
          note: propertiesToUpdate.note,
          time: new Date(),
          user: req.body.user,
          change: 'Updated'
        });
        addToAudit.save();
      });
  });
  Device.bulkWrite([
    {
      updateMany: {
        filter: {_id: { $in: devicesToUpdateArr}},
        update: propertiesToUpdate
      }
    }
  ])
  .then(updated => {
    if (updated.modifiedCount > 0) {
      res.status(200).json({
        message: 'Update Successful',
        updated: updated
      });
    } else {
      res.status(401).json({
        message: 'Update Not Authorized'
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
  let devicesToDeleteArr = req.params.idList.split(',');
  let user = devicesToDeleteArr[devicesToDeleteArr.length - 1]
  devicesToDeleteArr.pop();

  devicesToDeleteArr.forEach(id => {
    Device.findOne().where('_id').equals(id)
      .then(result => {
        const addToAudit = new Audit({
          traffic: result.traffic,
          condition: result.condition,
          type: result.type,
          brand: result.brand,
          model: result.model,
          serial: result.serial,
          rma: result.rma,
          note: result.note,
          time: new Date(),
          user: user,
          change: 'Removed'
        });
        addToAudit.save()
   });
  });

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
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Could Not Delete Device From Inventory'
    });
  });
}

exports.getAudit = (req, res, next) => {
  Audit.find()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Audit Log Fetched Successfully',
        audit: result,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Could Not Delete Device From Inventory'
      });
    })
}
