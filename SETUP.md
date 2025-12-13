# GOFaRm Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation Steps

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gofarm
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
```

### 4. Configure Frontend Environment
Create `client/.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start MongoDB
Make sure MongoDB is running on your system.

### 6. Run the Application

#### Start Backend (from root directory)
```bash
npm run dev
```

#### Start Frontend (from client directory)
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## User Roles
- Farmer: Can list products, manage crops, detect diseases
- Retailer: Can browse and order products, manage inventory
- Consumer: Can browse products, add to cart, place orders

## Features Implemented
✓ User authentication with JWT
✓ Role-based dashboards
✓ Product management
✓ Crop management
✓ Shopping cart
✓ Order management
✓ Real-time chat
✓ Community forum
✓ Market prices
✓ Government schemes
✓ Crop disease detection
✓ Reports system
