const express = require('express');
const InventoryController = require('../controllers/inventory');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
/**
 * Retrieve All Devices From Inventory
 */
router.get('', checkAuth, InventoryController.getAllInventory);
/**
 * Retrieve Stock Devices From Inventory
 */
router.get('/instock', checkAuth, InventoryController.getInStockInventory);
/**
 * Retrieve Inbound Devices From Inventory
 */
router.get('/inbound', checkAuth, InventoryController.getInboundInventory);
/**
 * Retrieve Outbound Devices From Inventory
 */
router.get('/outbound', checkAuth, InventoryController.getOutboundInventory);
/**
 * Add New Device To Inventory
 */
router.post('', checkAuth, InventoryController.createDevice);
/**
 * Update Device In Inventory
 */
router.patch('/:idList', checkAuth, InventoryController.updateDevice);
/**
 * Delete Device In Inventory
 */
router.delete('/:idList', checkAuth, InventoryController.deleteDevice);
/**
 * Retrieve Audit Log
 */
router.get('/audit', checkAuth, InventoryController.getAudit);

module.exports = router;
