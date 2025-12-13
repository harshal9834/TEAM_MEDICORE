# GOFaRm - Agricultural Marketplace 🌾

A comprehensive MERN stack application connecting farmers, retailers, and consumers in a unified agricultural marketplace.

## ✨ Features

### For Farmers 👨‍🌾
- Product listing and management
- Crop disease detection with AI
- Crop management and tracking
- Waste management solutions
- Government schemes information
- Future demand predictions
- Direct communication with retailers
- Community engagement

### For Retailers 🏪
- Browse and purchase from farmers
- Waste product sourcing
- Product inventory management
- Business community features
- Direct farmer contact
- Order tracking

### For Consumers 🛒
- Browse 42+ products across 6 categories
- Shopping cart and wishlist
- Secure checkout process
- Order tracking
- Direct farmer contact
- Community participation
- Product reviews

### Common Features 🌟
- Real-time chat with Socket.IO
- News and market updates
- Live market prices
- Community posts with likes/comments
- User profiles and authentication
- Report system
- Responsive design

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Zustand (State Management)
- Tailwind CSS
- Lucide Icons
- Axios

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Socket.IO (Real-time)
- JWT Authentication
- bcryptjs (Password Hashing)
- Helmet (Security)
- Morgan (Logging)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

#### 1. Clone and Install
```bash
# Install all dependencies (backend + frontend)
npm run install-all
```

#### 2. Configure Environment
Create `.env` file in root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### 3. Seed Database (Optional)
```bash
# Seed sample news and market prices
npm run seed:all
```

#### 4. Start Development Servers

**Option A: Use the batch file (Windows)**
```bash
start-dev.bat
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

The application will open at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
gofarm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── auth/      # Authentication pages
│   │   │   ├── farmer/    # Farmer-specific pages
│   │   │   ├── retailer/  # Retailer-specific pages
│   │   │   ├── consumer/  # Consumer-specific pages
│   │   │   └── common/    # Shared pages
│   │   ├── store/         # Zustand stores
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main app component
│   └── public/            # Static assets
│
├── server/                # Express backend
│   ├── controllers/       # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── seeders/          # Database seeders
│   └── server.js         # Server entry point
│
├── image/                # Image assets
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## 📚 Documentation

- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Complete backend setup guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Full API reference
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide

## 🔌 API Overview

### Main Endpoints
- `/api/auth` - Authentication & registration
- `/api/users` - User management
- `/api/products` - Product CRUD operations
- `/api/cart` - Shopping cart management
- `/api/wishlist` - Wishlist operations
- `/api/orders` - Order processing
- `/api/crops` - Crop management
- `/api/news` - News articles
- `/api/market-prices` - Live market prices
- `/api/chat` - Real-time messaging
- `/api/posts` - Community posts
- `/api/reports` - Issue reporting

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete details.

## 🗄️ Database Models

- **User** - Authentication and profiles
- **Product** - Product listings
- **Cart** - Shopping carts
- **Wishlist** - User wishlists
- **Order** - Purchase orders
- **Crop** - Crop management
- **News** - News articles
- **MarketPrice** - Market pricing data
- **Chat** - Messages and conversations
- **Post** - Community posts
- **Report** - Issue reports

## 🔐 Authentication

JWT-based authentication with role-based access control:
- **Farmer** - Can list products, manage crops
- **Retailer** - Can purchase from farmers, manage inventory
- **Consumer** - Can shop products, interact with community

## 🌐 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed:news  # Seed news articles
npm run seed:prices # Seed market prices
npm run seed:all   # Seed all data
```

### Frontend
```bash
cd client
npm start          # Start React development server
npm run build      # Build for production
```

## 🎨 UI Features

- Modern, responsive design with Tailwind CSS
- Smooth animations and transitions
- Mobile-friendly interface
- Dark mode support (Profile section)
- Interactive components
- Real-time updates

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Windows
npx kill-port 5000
# Or use the provided script
.\kill-port-5000.ps1
```

### MongoDB Connection Issues
- Verify MONGODB_URI in `.env`
- Check network access in MongoDB Atlas
- Whitelist your IP address

### Frontend Not Loading
- Clear browser cache
- Check if backend is running
- Verify REACT_APP_API_URL in client/.env

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
