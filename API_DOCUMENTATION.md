# GOFaRm API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Routes

### Register User
```http
POST /api/auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer" // farmer, consumer, retailer
}
```

### Login
```http
POST /api/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 👤 User Routes

### Get Profile
```http
GET /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`

### Update Profile
```http
PUT /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

---

## 🛒 Product Routes

### Get All Products
```http
GET /api/products
```
**Query Params:**
- `category` - Filter by category
- `search` - Search products
- `limit` - Number of results (default: 20)
- `page` - Page number (default: 1)

### Get Product by ID
```http
GET /api/products/:id
```

### Create Product
```http
POST /api/products
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Fresh Tomatoes",
  "description": "Organic tomatoes",
  "price": 45,
  "category": "Vegetables",
  "unit": "kg",
  "quantity": 100
}
```

### Update Product
```http
PUT /api/products/:id
```
**Headers:** `Authorization: Bearer <token>`

### Delete Product
```http
DELETE /api/products/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 🛍️ Cart Routes

### Get Cart
```http
GET /api/cart
```
**Headers:** `Authorization: Bearer <token>`

### Add to Cart
```http
POST /api/cart/add
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /api/cart/update
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/remove/:productId
```
**Headers:** `Authorization: Bearer <token>`

### Clear Cart
```http
DELETE /api/cart/clear
```
**Headers:** `Authorization: Bearer <token>`

---

## ❤️ Wishlist Routes

### Get Wishlist
```http
GET /api/wishlist
```
**Headers:** `Authorization: Bearer <token>`

### Add to Wishlist
```http
POST /api/wishlist/add
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "productId": "product_id_here"
}
```

### Remove from Wishlist
```http
DELETE /api/wishlist/remove/:productId
```
**Headers:** `Authorization: Bearer <token>`

---

## 📦 Order Routes

### Get Orders
```http
GET /api/orders
```
**Headers:** `Authorization: Bearer <token>`

### Create Order
```http
POST /api/orders
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 45
    }
  ],
  "totalAmount": 90,
  "shippingAddress": "123 Main St"
}
```

### Update Order Status
```http
PUT /api/orders/:id/status
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "status": "delivered"
}
```

---

## 🌾 Crop Routes

### Get All Crops
```http
GET /api/crops
```
**Headers:** `Authorization: Bearer <token>`

### Add Crop
```http
POST /api/crops
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Wheat",
  "variety": "HD-2967",
  "area": 5,
  "sowingDate": "2024-11-01",
  "expectedHarvest": "2025-03-15"
}
```

---

## 📰 News Routes

### Get All News
```http
GET /api/news
```
**Query Params:**
- `category` - Filter by category
- `limit` - Number of results (default: 20)
- `page` - Page number (default: 1)

### Get News by ID
```http
GET /api/news/:id
```

### Create News
```http
POST /api/news
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "title": "News Title",
  "content": "Full news content",
  "summary": "Brief summary",
  "category": "Agriculture",
  "image": "/path/to/image.jpg",
  "tags": ["farming", "technology"]
}
```

---

## 💰 Market Price Routes

### Get All Prices
```http
GET /api/market-prices
```
**Query Params:**
- `category` - Filter by category
- `state` - Filter by state
- `district` - Filter by district
- `search` - Search product name

### Get Trending Prices
```http
GET /api/market-prices/trending
```

### Create Price
```http
POST /api/market-prices
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "productName": "Tomato",
  "category": "Vegetables",
  "currentPrice": 45,
  "unit": "kg",
  "market": "Azadpur Mandi",
  "state": "Delhi",
  "district": "North Delhi"
}
```

---

## 💬 Chat Routes

### Get Conversations
```http
GET /api/chat/conversations
```
**Headers:** `Authorization: Bearer <token>`

### Get Messages
```http
GET /api/chat/:conversationId
```
**Headers:** `Authorization: Bearer <token>`

### Send Message
```http
POST /api/chat/send
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "receiverId": "user_id",
  "message": "Hello!"
}
```

---

## 📝 Post Routes (Community)

### Get All Posts
```http
GET /api/posts
```

### Create Post
```http
POST /api/posts
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "content": "Post content here",
  "image": "/path/to/image.jpg"
}
```

### Like Post
```http
POST /api/posts/:id/like
```
**Headers:** `Authorization: Bearer <token>`

### Comment on Post
```http
POST /api/posts/:id/comment
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "comment": "Great post!"
}
```

---

## 📊 Report Routes

### Create Report
```http
POST /api/reports
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "type": "issue",
  "title": "Report Title",
  "description": "Detailed description"
}
```

### Get Reports
```http
GET /api/reports
```
**Headers:** `Authorization: Bearer <token>`

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error
