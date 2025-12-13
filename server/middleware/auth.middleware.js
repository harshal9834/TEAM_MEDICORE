const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log('🔐 Auth middleware - Headers:', req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('🔐 Auth middleware - Token exists:', !!token);
    console.log('🔐 Auth middleware - Token length:', token?.length);

    if (!token) {
      console.log('❌ Auth middleware - No token provided');
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('🔐 Auth middleware - Token decoded:', { id: decoded.id, role: decoded.role });
      
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        console.log('❌ Auth middleware - User not found for ID:', decoded.id);
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      console.log('✅ Auth middleware - User authenticated:', { id: req.user._id, name: req.user.name, role: req.user.role });

      next();
    } catch (error) {
      console.log('❌ Auth middleware - Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};
