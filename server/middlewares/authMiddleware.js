const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check if authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Proceed to the next middleware/route handler
            next();
        } catch (error) {
            console.error('Token verification error:', error.message); // Log error message for debugging
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // No token provided
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
