const express = require('express');
const InventoryController = require('../controllers/inventory');
const router = express.Router();

router.get('/search?', InventoryController.searchInventory)

router.get('', InventoryController.getAllInventory);

router.get('/inbound', InventoryController.getInboundInventory);

router.get('/outbound', InventoryController.getOutboundInventory);

router.post('', InventoryController.createDevice);

router.patch('/:id', InventoryController.updateDevice);

router.delete('/:id', InventoryController.deleteDevice);

module.exports = router;
