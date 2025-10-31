// backend/src/controllers/authController.js (UPDATED)

const { User, Vendor, Consignee } = require('../../models');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { email, mobile, password, role, name } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Create user (password hashing happens in beforeCreate hook)
        const user = await User.create({
            email,
            mobile,
            passwordHash: password, // Will be hashed by hook
            role,
            name
        });

        // Create vendor or consignee record
        if (role === 'vendor') {
            await Vendor.create({ userId: user.id });
        } else {
            await Consignee.create({ userId: user.id });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with associations
        const user = await User.findOne({
            where: { email },
            include: [
                { model: Vendor, as: 'vendor' },
                { model: Consignee, as: 'consignee' }
            ]
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Validate password
        const isValid = await user.validatePassword(password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Get vendor or consignee ID
        const profileId = user.role === 'vendor' ? user.vendor?.id : user.consignee?.id;
        const kycStatus = user.role === 'vendor' ? user.vendor?.kycStatus : user.consignee?.kycStatus;

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                profileId,
                kycStatus
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
};
