const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const CottonUser = require('../models/CottonUser');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (admin.apps.length === 0) {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('⚠️ Firebase environment variables not found.');
      console.warn('Firebase authentication will not work without FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
      return false;
    }

    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });

      console.log('✓ Firebase Admin SDK initialized');
      return true;
    } catch (error) {
      console.warn('⚠️ Firebase initialization failed:', error.message);
      console.warn('Firebase authentication will not work - Check your service account credentials');
      return false;
    }
  }
  return true;
};

// Verify Firebase ID Token Middleware
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided',
        code: 'NO_TOKEN'
      });
    }

    // Extract token from Bearer scheme
    const token = authHeader.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization format. Use: Bearer <token>',
        code: 'INVALID_FORMAT'
      });
    }

    // Verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user info to request
    req.user = {
      firebase_uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      token: decodedToken
    };

    // Get or create user in MongoDB
    let user = await CottonUser.findOne({ firebase_uid: decodedToken.uid });

    if (!user) {
      // First login - create user in MongoDB
      user = new CottonUser({
        firebase_uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email.split('@')[0],
        last_login: new Date()
      });
      await user.save();
      console.log(`✓ New user created: ${decodedToken.email}`);
    } else {
      // Update last login
      user.last_login = new Date();
      await user.save();
    }

    // Attach MongoDB user ID to request
    req.user.mongo_id = user._id;
    req.user.user_data = user;

    next();
  } catch (error) {
    console.error('Firebase verification error:', error.message);

    let errorCode = 'INVALID_TOKEN';
    let status = 401;

    if (error.code === 'auth/id-token-expired') {
      errorCode = 'TOKEN_EXPIRED';
      status = 401;
    } else if (error.code === 'auth/invalid-id-token') {
      errorCode = 'INVALID_TOKEN';
      status = 401;
    }

    return res.status(status).json({
      success: false,
      message: 'Token verification failed',
      code: errorCode,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  initializeFirebase,
  verifyFirebaseToken
};
