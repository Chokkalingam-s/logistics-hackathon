// backend/src/middleware/auth.js (UPDATED)

const jwt = require('jsonwebtoken');
const { User } = require('../../models');

exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Optionally fetch user from database
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
