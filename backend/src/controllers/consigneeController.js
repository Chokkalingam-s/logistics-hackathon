// backend/src/controllers/consigneeController.js

const { Consignee, Shipment, VendorRoute, Truck, Vendor, User } = require('../../models');
const { Op } = require('sequelize');

exports.submitKYC = async (req, res) => {
    try {
        const { businessName, gstin } = req.body;
        const userId = req.user.userId;

        const consignee = await Consignee.findOne({ where: { userId } });

        if (!consignee) {
            return res.status(404).json({ success: false, message: 'Consignee not found' });
        }

        await consignee.update({
            businessName,
            gstin,
            kycStatus: 'verified' // Auto-verify for hackathon
        });

        res.json({ success: true, message: 'KYC submitted successfully', consignee });
    } catch (error) {
        console.error('KYC submission error:', error);
        res.status(500).json({ success: false, message: 'KYC submission failed' });
    }
};

exports.createShipment = async (req, res) => {
    try {
        const {
            pickupLocation,
            dropLocation,
            productCategory,
            totalWeight,
            totalVolume,
            pickupDate
        } = req.body;

        const userId = req.user.userId;

        // Get consignee
        const consignee = await Consignee.findOne({ where: { userId } });

        if (!consignee) {
            return res.status(404).json({ success: false, message: 'Consignee not found' });
        }

        // Create shipment
        const shipment = await Shipment.create({
            consigneeId: consignee.id,
            pickupLocation,
            dropLocation,
            productCategory,
            totalWeight,
            totalVolume,
            pickupDate,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Shipment created successfully',
            shipment
        });
    } catch (error) {
        console.error('Create shipment error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create shipment',
            error: error.message 
        });
    }
};

exports.getMyShipments = async (req, res) => {
    try {
        const userId = req.user.userId;

        const consignee = await Consignee.findOne({ where: { userId } });

        if (!consignee) {
            return res.status(404).json({ success: false, message: 'Consignee not found' });
        }

        const shipments = await Shipment.findAll({
            where: { consigneeId: consignee.id },
            order: [['createdAt', 'DESC']]
        });

        res.json({ success: true, shipments });
    } catch (error) {
        console.error('Get shipments error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch shipments' });
    }
};

exports.getAvailableTrucks = async (req, res) => {
    try {
        const { shipmentId } = req.params;

        // Get shipment details
        const shipment = await Shipment.findByPk(shipmentId);

        if (!shipment) {
            return res.status(404).json({ success: false, message: 'Shipment not found' });
        }

        // Find available routes that match pickup and drop locations
        const availableRoutes = await VendorRoute.findAll({
            where: {
                status: 'available',
                availableDate: {
                    [Op.gte]: shipment.pickupDate
                }
            },
            include: [
                {
                    model: Truck,
                    as: 'truck',
                    where: {
                        currentStatus: 'available',
                        maxWeightCapacity: {
                            [Op.gte]: shipment.totalWeight / 1000 // Convert kg to tons
                        },
                        volumeCapacity: {
                            [Op.gte]: shipment.totalVolume
                        }
                    }
                },
                {
                    model: Vendor,
                    as: 'vendor',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: ['name', 'email', 'mobile']
                    }]
                }
            ]
        });

        res.json({ 
            success: true, 
            matches: availableRoutes,
            shipment 
        });
    } catch (error) {
        console.error('Get available trucks error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch available trucks' });
    }
};

exports.bookTruck = async (req, res) => {
    try {
        const { shipmentId, routeId, agreedPrice } = req.body;

        // Create booking logic here (we'll implement in next phase)
        res.json({ 
            success: true, 
            message: 'Booking created successfully',
            bookingId: Math.floor(Math.random() * 10000) // Mock for now
        });
    } catch (error) {
        console.error('Book truck error:', error);
        res.status(500).json({ success: false, message: 'Failed to book truck' });
    }
};
