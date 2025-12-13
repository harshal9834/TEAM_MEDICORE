# GOFaRm Quick Start Guide

## Current Status
✅ Backend server running on port 5000
✅ Frontend React app running on port 3000
✅ CSS styling applied
✅ All components created

## Access the Application

### Frontend URL
**http://localhost:3000**

### Available Pages

#### Public Pages (No login required)
- **Home**: http://localhost:3000/
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Role Selection**: http://localhost:3000/role-selection

#### After Login (Protected Routes)
Based on your role, you'll be redirected to:

**Farmer Dashboard**: http://localhost:3000/farmer/dashboard
- My Products
- Crop Management
- Disease Detection
- Orders

**Retailer Dashboard**: http://localhost:3000/retailer/dashboard
- Browse Products
- Inventory Management
- Orders

**Consumer Dashboard**: http://localhost:3000/consumer/dashboard
- Browse Products
- Shopping Cart
- My Orders

#### Common Pages (All logged-in users)
- **Profile**: http://localhost:3000/profile
- **Chat**: http://localhost:3000/chat
- **Community**: http://localhost:3000/community
- **Orders**: http://localhost:3000/orders
- **Market Prices**: http://localhost:3000/market-prices
- **Government Schemes**: http://localhost:3000/govt-schemes
- **News**: http://localhost:3000/news

## What You Should See

### Navbar
- Green background (#2d6a4f)
- White text
- Logo on the left
- Navigation links on the right
- Cart icon with item count (for consumers)

### Styling
- Clean, modern design
- Green color scheme
- Card-based layouts
- Hover effects on buttons and cards
- Responsive design

## Testing the Application

### 1. Register a New User
1. Go to http://localhost:3000/register
2. Fill in the form:
   - Name
   - Email
   - Password
   - Select Role (Farmer/Retailer/Consumer)
3. Click Register

### 2. Login
1. Go to http://localhost:3000/login
2. Enter your email and password
3. Click Login

### 3. Explore Features
- Browse products
- Add items to cart (consumers)
- Create products (farmers)
- View orders
- Use community forum
- Check market prices

## Troubleshooting

### CSS Not Showing?
1. Hard refresh the browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check browser console for errors (F12)

### Backend Not Connected?
- Make sure MongoDB is running
- Check that backend server is running on port 5000
- Verify .env file has correct MONGODB_URI

### Port Already in Use?
```powershell
# Kill process on port 5000
Get-NetTCPConnection -LocalPort 5000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# Kill process on port 3000
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## Color Scheme
- Primary Green: #2d6a4f
- Secondary Green: #52b788
- Accent Red: #d62828
- Background: #f5f5f5
- White: #ffffff

## Next Steps
1. Install and start MongoDB if not already running
2. Test user registration and login
3. Create sample products as a farmer
4. Browse and purchase as a consumer
5. Customize styling as needed
