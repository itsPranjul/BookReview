const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


// Middleware to authenticate JWT tokens
// This middleware checks if the request has a valid JWT token in the Authorization header

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};
    
module.exports = authMiddleware;