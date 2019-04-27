const express = require('express');
const InventoryController = require('../controllers/inventory');
const router = express.Router();
/**
 * Retrieve All Devices From Inventory
 */
router.get('', InventoryController.getAllInventory);
/**
 * Retrieve Stock Devices From Inventory
 */
router.get('/instock', InventoryController.getInStockInventory);
/**
 * Retrieve Inbound Devices From Inventory
 */
router.get('/inbound', InventoryController.getInboundInventory);
/**
 * Retrieve Outbound Devices From Inventory
 */
router.get('/outbound', InventoryController.getOutboundInventory);
/**
 * Add New Device To Inventory
 */
router.post('', InventoryController.createDevice);
/**
 * Update Device In Inventory
 */
router.patch('/:idList', InventoryController.updateDevice);
/**
 * Delete Device In Inventory
 */
router.delete('/:idList', InventoryController.deleteDevice);

module.exports = router;
