# Backend Setup Guide

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (already exists):
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

---

## 📦 Backend Structure

```
server/
├── controllers/        # Request handlers
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── chat.controller.js
│   ├── crop.controller.js
│   ├── marketPrice.controller.js
│   ├── news.controller.js
│   ├── order.controller.js
│   ├── post.controller.js
│   ├── product.controller.js
│   ├── report.controller.js
│   ├── user.controller.js
│   └── wishlist.controller.js
│
├── models/            # Database schemas
│   ├── Cart.model.js
│   ├── Chat.model.js
│   ├── Crop.model.js
│   ├── MarketPrice.model.js
│   ├── News.model.js
│   ├── Order.model.js
│   ├── Post.model.js
│   ├── Product.model.js
│   ├── Report.model.js
│   ├── User.model.js
│   └── Wishlist.model.js
│
├── routes/            # API routes
│   ├── auth.routes.js
│   ├── cart.routes.js
│   ├── chat.routes.js
│   ├── crop.routes.js
│   ├── marketPrice.routes.js
│   ├── news.routes.js
│   ├── order.routes.js
│   ├── post.routes.js
│   ├── product.routes.js
│   ├── report.routes.js
│   ├── user.routes.js
│   └── wishlist.routes.js
│
├── middleware/        # Custom middleware
│   └── auth.middleware.js
│
├── seeders/          # Database seeders
│   ├── news.seed.js
│   └── marketPrices.seed.js
│
└── server.js         # Main server file
```

---

## 🗄️ Database Models

### User Model
- Authentication and user profiles
- Roles: farmer, consumer, retailer
- Fields: name, email, password, role, phone, address

### Product Model
- Product listings by farmers
- Categories: Vegetables, Fruits, Grains, etc.
- Fields: name, price, quantity, category, seller

### Cart Model
- User shopping carts
- Linked to products and users
- Auto-calculates total amount

### Wishlist Model
- User wishlists
- Many-to-many relationship with products

### Order Model
- Purchase orders
- Order status tracking
- Payment information

### Crop Model
- Farmer crop management
- Planting and harvest tracking
- Yield predictions

### News Model
- Agricultural news articles
- Categories: Agriculture, Technology, Market, Policy
- View tracking

### MarketPrice Model
- Real-time market prices
- Price change tracking
- Location-based pricing

### Chat Model
- Real-time messaging
- User-to-user conversations
- Socket.IO integration

### Post Model
- Community posts
- Likes and comments
- Social features

### Report Model
- Issue reporting
- Status tracking
- Admin management

---

## 🔐 Authentication

The backend uses JWT (JSON Web Tokens) for authentication.

### Protected Routes
Most routes require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Middleware
The `auth.middleware.js` verifies tokens and attaches user info to requests.

---

## 🌱 Seeding Data

Populate the database with sample data:

```bash
# Seed news articles
npm run seed:news

# Seed market prices
npm run seed:prices

# Seed all data
npm run seed:all
```

---

## 🔌 API Endpoints

See `API_DOCUMENTATION.md` for complete API reference.

### Main Routes:
- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/products` - Product CRUD
- `/api/cart` - Shopping cart
- `/api/wishlist` - Wishlist management
- `/api/orders` - Order processing
- `/api/crops` - Crop management
- `/api/news` - News articles
- `/api/market-prices` - Market prices
- `/api/chat` - Real-time chat
- `/api/posts` - Community posts
- `/api/reports` - Issue reporting

---

## 🔄 Real-time Features

### Socket.IO Integration
The server includes Socket.IO for real-time features:

- **Chat messaging** - Instant message delivery
- **Notifications** - Real-time updates
- **Live updates** - Price changes, order status

### Socket Events:
- `join-room` - Join a chat room
- `send-message` - Send a message
- `receive-message` - Receive messages

---

## 🛡️ Security Features

- **Helmet.js** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **JWT** - Secure authentication
- **Password hashing** - bcryptjs encryption
- **Input validation** - express-validator

---

## 📊 Monitoring

### Health Check
```http
GET /api/health
```
Returns server status and uptime.

### Logging
Morgan middleware logs all HTTP requests in development mode.

---

## 🐛 Error Handling

The backend includes comprehensive error handling:

- **404 Handler** - Route not found
- **500 Handler** - Server errors
- **Validation Errors** - Input validation
- **Auth Errors** - Unauthorized access

---

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=strong_random_secret
PORT=5000
CLIENT_URL=your_production_client_url
```

### Start Production Server
```bash
npm start
```

---

## 📝 Development Tips

1. **Use nodemon** - Auto-restart on file changes
   ```bash
   npm run dev
   ```

2. **Check MongoDB connection** - Verify connection string in `.env`

3. **Test endpoints** - Use Postman or Thunder Client

4. **Monitor logs** - Check console for errors and requests

5. **Seed data** - Use seeders for testing

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI in `.env`
- Check network access in MongoDB Atlas
- Whitelist your IP address

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
npx kill-port 5000

# Or use the provided script
.\kill-port-5000.ps1
```

### JWT Errors
- Ensure JWT_SECRET is set in `.env`
- Check token expiration
- Verify Authorization header format

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [JWT Documentation](https://jwt.io/)
