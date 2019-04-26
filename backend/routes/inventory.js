const express = require('express');
const InventoryController = require('../controllers/inventory');
const router = express.Router();
/**
 *  Search Functionality
 */
router.get('/search?', InventoryController.searchInventory)
/**
 * Retrieve All Devices From Inventory
 */
router.get('', InventoryController.getAllInventory);
/**
 * Don't Think This Will Be Needed <----------------
 */
router.get('/inbound', InventoryController.getInboundInventory);
/**
 * Don't Think This Will Be Needed <----------------
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
