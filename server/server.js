const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import custom modules
const { initializeSocket } = require('./utils/socket');
const { initializeFirebase } = require('./middleware/firebaseAuth');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cropRoutes = require('./routes/crop.routes');
const orderRoutes = require('./routes/order.routes');
const chatRoutes = require('./routes/chat.routes');
const postRoutes = require('./routes/post.routes');
const reportRoutes = require('./routes/report.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const cartRoutes = require('./routes/cart.routes');
const newsRoutes = require('./routes/news.routes');
const marketPriceRoutes = require('./routes/marketPrice.routes');
const wasteProductRoutes = require('./routes/wasteProduct.routes');
const cottonDiseaseRoutes = require('./routes/cottonDisease.routes');
const weatherRoutes = require('./routes/weather.routes');

const app = express();
const server = http.createServer(app);

// ------------------
// 🔐 Security Middleware
// ------------------
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ------------------
// 📂 Static Files
// ------------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/image', express.static(path.join(__dirname, '../image')));

// ------------------
// 🗄 MongoDB Connection
// ------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// ------------------
// 🔥 Initialize Firebase
// ------------------
console.log('\n🔥 Initializing Firebase...');
initializeFirebase();

// ------------------
// 🌐 Socket.IO Setup
// ------------------
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

initializeSocket(io);
app.set('io', io);

// ------------------
// 🏠 Root Route (FIXED 404 ISSUE)
// ------------------
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Cotton Disease Detection API is running',
    environment: process.env.NODE_ENV || 'development',
    health_check: '/api/health'
  });
});

// Prevent favicon 404 spam
app.get('/favicon.ico', (req, res) => res.status(204).end());

// ------------------
// 📡 Health Check
// ------------------
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Server is healthy'
  });
});

// ------------------
// 📦 API Routes
// ------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/waste-products', wasteProductRoutes);
app.use('/api/cotton', cottonDiseaseRoutes);
app.use('/api/weather', weatherRoutes);

// ------------------
// ❌ 404 Handler
// ------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// ------------------
// 🛑 Global Error Handler
// ------------------
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ------------------
// 🚀 Start Server
// ------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('\n🚀 Server Started Successfully');
  console.log(`🌍 Port: ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };