const express = require('express');
const InventoryController = require('../controllers/inventory');
const router = express.Router();

router.get('', InventoryController.getInventory);

router.post('', InventoryController.createDevice);

router.put('/:id', InventoryController.updateDevice);

router.delete('/:id', InventoryController.deleteDevice);

// Search Functionality

module.exports = router;
