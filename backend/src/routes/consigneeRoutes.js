// backend/src/routes/consigneeRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const consigneeController = require('../controllers/consigneeController');

router.post('/kyc', protect, consigneeController.submitKYC);
router.post('/shipments', protect, consigneeController.createShipment);
router.get('/shipments', protect, consigneeController.getMyShipments);
router.get('/shipments/:shipmentId/matches', protect, consigneeController.getAvailableTrucks);
router.post('/bookings', protect, consigneeController.bookTruck);

module.exports = router;
