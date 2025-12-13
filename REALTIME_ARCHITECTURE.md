# Real-Time Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GOFARM REAL-TIME SYSTEM                      │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   FARMER CLIENT  │         │ RETAILER CLIENT  │         │ CONSUMER CLIENT  │
│   (Browser 1)    │         │   (Browser 2)    │         │   (Browser 3)    │
└────────┬─────────┘         └────────┬─────────┘         └────────┬─────────┘
         │                            │                            │
         │ WebSocket                  │ WebSocket                  │ WebSocket
         │ Connection                 │ Connection                 │ Connection
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │     SOCKET.IO SERVER            │
                    │     (Node.js + Express)         │
                    │                                 │
                    │  ┌───────────────────────────┐ │
                    │  │   socket.js Utility       │ │
                    │  │   - Event Handlers        │ │
                    │  │   - Room Management       │ │
                    │  │   - Broadcasting          │ │
                    │  └───────────────────────────┘ │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │         CONTROLLERS             │
                    │  - product.controller.js        │
                    │  - chat.controller.js           │
                    │  - order.controller.js          │
                    └─────────────────────────────────┘
                                      │
                                      ▼
                    ┌─────────────────────────────────┐
                    │         MONGODB                 │
                    │  - Products Collection          │
                    │  - Chats Collection             │
                    │  - Messages Collection          │
                    └─────────────────────────────────┘
```

## Product Update Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REAL-TIME PRODUCT UPDATE FLOW                     │
└─────────────────────────────────────────────────────────────────────┘

FARMER                    BACKEND                    RETAILERS
  │                          │                          │
  │  1. Add Product          │                          │
  ├─────────────────────────>│                          │
  │  POST /api/products      │                          │
  │                          │                          │
  │                          │  2. Save to MongoDB      │
  │                          ├──────────────┐           │
  │                          │              │           │
  │                          │<─────────────┘           │
  │                          │                          │
  │                          │  3. Emit Socket Event    │
  │                          │  'product-added'         │
  │                          ├─────────────────────────>│
  │                          │                          │
  │  4. Response             │                          │  5. Update UI
  │<─────────────────────────┤                          │  (No Refresh!)
  │  { success: true }       │                          ├──────────┐
  │                          │                          │          │
  │                          │                          │<─────────┘
  │                          │                          │
  │                          │                          │  6. Toast
  │                          │                          │  Notification
  │                          │                          │
```

## Chat Message Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REAL-TIME CHAT MESSAGE FLOW                       │
└─────────────────────────────────────────────────────────────────────┘

USER A                    BACKEND                    USER B
  │                          │                          │
  │  1. Join Chat Room       │                          │  1. Join Chat Room
  ├─────────────────────────>│<─────────────────────────┤
  │  emit('join-chat-room')  │  emit('join-chat-room')  │
  │                          │                          │
  │                          │  Both users in room      │
  │                          │  'chat-{chatId}'         │
  │                          │                          │
  │  2. Type Message         │                          │
  │  "Hello!"                │                          │
  │                          │                          │
  │  3. Send Message         │                          │
  ├─────────────────────────>│                          │
  │  POST /api/chat/message  │                          │
  │                          │                          │
  │                          │  4. Save to MongoDB      │
  │                          ├──────────────┐           │
  │                          │              │           │
  │                          │<─────────────┘           │
  │                          │                          │
  │                          │  5. Emit to Room         │
  │                          │  'new-message'           │
  │                          ├─────────────────────────>│
  │<─────────────────────────┤                          │
  │                          │                          │
  │  6. Message Appears      │                          │  6. Message Appears
  │  in UI                   │                          │  in UI
  │                          │                          │
```

## Typing Indicator Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TYPING INDICATOR FLOW                             │
└─────────────────────────────────────────────────────────────────────┘

USER A                    BACKEND                    USER B
  │                          │                          │
  │  1. Start Typing         │                          │
  │  (onChange event)        │                          │
  │                          │                          │
  │  2. Emit 'typing'        │                          │
  ├─────────────────────────>│                          │
  │  {chatId, userId, name}  │                          │
  │                          │                          │
  │                          │  3. Broadcast to Room    │
  │                          │  'user-typing'           │
  │                          ├─────────────────────────>│
  │                          │                          │
  │                          │                          │  4. Show Indicator
  │                          │                          │  "User A is typing..."
  │                          │                          │
  │  5. Stop Typing          │                          │
  │  (2 sec timeout)         │                          │
  │                          │                          │
  │  6. Emit 'stop-typing'   │                          │
  ├─────────────────────────>│                          │
  │                          │                          │
  │                          │  7. Broadcast            │
  │                          │  'user-stop-typing'      │
  │                          ├─────────────────────────>│
  │                          │                          │
  │                          │                          │  8. Hide Indicator
  │                          │                          │
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND COMPONENT STRUCTURE                      │
└─────────────────────────────────────────────────────────────────────┘

                            App.js
                               │
                               │ Wrapped by
                               ▼
                        SocketProvider
                        (SocketContext)
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
         FarmerDashboard  RetailerDashboard  ConsumerDashboard
                │              │              │
                │              │              │
        ┌───────┴───────┐      │      ┌───────┴───────┐
        │               │      │      │               │
        ▼               ▼      ▼      ▼               ▼
   AddProducts    FarmerProducts  RetailerProducts  ConsumerShop
        │               │      │      │               │
        │               │      │      │               │
        │               │      │      │               │
        └───────────────┴──────┴──────┴───────────────┘
                               │
                               │ Uses
                               ▼
                    ┌──────────────────────┐
                    │   Custom Hooks       │
                    │                      │
                    │  useRealtimeProducts │
                    │  useRealtimeChat     │
                    │  useSocket           │
                    └──────────────────────┘
```

## Socket Event Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SOCKET EVENT LIFECYCLE                            │
└─────────────────────────────────────────────────────────────────────┘

CLIENT SIDE                                    SERVER SIDE

1. Component Mounts
   │
   ▼
2. useSocket() Hook
   │
   ▼
3. Socket Connection
   │ (WebSocket Handshake)
   ├──────────────────────────────────────────>  4. Connection Event
   │                                                  │
   │                                                  ▼
   │                                             5. Join User Room
   │                                                socket.join('user-123')
   │
6. Join Chat Room
   emit('join-chat-room', chatId)
   ├──────────────────────────────────────────>  7. Add to Room
   │                                                socket.join('chat-456')
   │
8. Listen for Events
   socket.on('new-message', handler)
   │
   │                                             9. Event Occurs
   │                                                (New message saved)
   │                                                  │
   │                                                  ▼
   │                                             10. Emit to Room
   │                                                io.to('chat-456')
   │                                                  .emit('new-message')
   │                                                  │
11. Receive Event                              <─────┘
   handler(data)
   │
   ▼
12. Update State
   setMessages([...messages, newMessage])
   │
   ▼
13. Re-render UI
   (Message appears)

14. Component Unmounts
   │
   ▼
15. Cleanup
   socket.off('new-message', handler)
   socket.emit('leave-chat-room', chatId)
```

## Room-Based Broadcasting

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SOCKET.IO ROOMS STRUCTURE                         │
└─────────────────────────────────────────────────────────────────────┘

                        SOCKET.IO SERVER
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   Global Room          User Rooms              Chat Rooms
   (All Clients)        (Personal)              (Private)
        │                      │                      │
        │                      │                      │
   ┌────┴────┐          ┌──────┴──────┐        ┌──────┴──────┐
   │         │          │             │        │             │
   ▼         ▼          ▼             ▼        ▼             ▼
Farmer1  Retailer1  user-123     user-456  chat-abc     chat-xyz
Farmer2  Retailer2                          │         │
Farmer3  Consumer1                          │         │
                                            │         │
                                            ▼         ▼
                                        Farmer1    Farmer2
                                        Retailer1  Retailer3

BROADCASTING:
- Global: io.emit('product-added', data)
  → All clients receive

- User Room: io.to('user-123').emit('order-updated', data)
  → Only user-123 receives

- Chat Room: io.to('chat-abc').emit('new-message', data)
  → Only participants in chat-abc receive
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COMPLETE DATA FLOW                                │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   FARMER     │
│   CLIENT     │
└──────┬───────┘
       │
       │ 1. User Action
       │    (Add Product)
       │
       ▼
┌──────────────────────┐
│  React Component     │
│  (AddProducts.jsx)   │
└──────┬───────────────┘
       │
       │ 2. API Call
       │    POST /api/products
       │
       ▼
┌──────────────────────┐
│  API Utility         │
│  (api.js)            │
└──────┬───────────────┘
       │
       │ 3. HTTP Request
       │
       ▼
┌──────────────────────┐
│  Express Router      │
│  (product.routes.js) │
└──────┬───────────────┘
       │
       │ 4. Route Handler
       │
       ▼
┌──────────────────────┐
│  Controller          │
│  (product.controller)│
└──────┬───────────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│   MongoDB    │  │  Socket.IO   │
│   (Save)     │  │  (Emit)      │
└──────┬───────┘  └──────┬───────┘
       │                 │
       │                 │ 5. Broadcast Event
       │                 │    'product-added'
       │                 │
       │                 ▼
       │          ┌──────────────┐
       │          │  All Clients │
       │          │  (Retailers) │
       │          └──────┬───────┘
       │                 │
       │                 │ 6. Socket Event
       │                 │
       │                 ▼
       │          ┌──────────────────────┐
       │          │  useRealtimeProducts │
       │          │  Hook                │
       │          └──────┬───────────────┘
       │                 │
       │                 │ 7. Callback
       │                 │
       │                 ▼
       │          ┌──────────────────────┐
       │          │  Update State        │
       │          │  setProducts([...])  │
       │          └──────┬───────────────┘
       │                 │
       │                 │ 8. Re-render
       │                 │
       │                 ▼
       │          ┌──────────────────────┐
       │          │  UI Updates          │
       │          │  (Product Appears)   │
       │          └──────────────────────┘
       │
       │ 9. Response
       │
       ▼
┌──────────────────────┐
│  Farmer Client       │
│  (Success Message)   │
└──────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                                  │
└─────────────────────────────────────────────────────────────────────┘

FRONTEND                    BACKEND                     DATABASE
┌──────────────┐           ┌──────────────┐           ┌──────────────┐
│   React      │           │   Node.js    │           │   MongoDB    │
│   v18.2.0    │           │   v16+       │           │   v7.5.0     │
└──────┬───────┘           └──────┬───────┘           └──────┬───────┘
       │                          │                          │
       │                          │                          │
┌──────┴───────┐           ┌──────┴───────┐           ┌──────┴───────┐
│ Socket.IO    │◄─────────►│ Socket.IO    │           │  Collections │
│ Client       │  WebSocket│ Server       │           │  - Products  │
│ v4.7.2       │           │ v4.7.2       │           │  - Chats     │
└──────────────┘           └──────────────┘           │  - Messages  │
                                  │                   └──────────────┘
                                  │
                           ┌──────┴───────┐
                           │   Express    │
                           │   v4.18.2    │
                           └──────────────┘

ADDITIONAL LIBRARIES:
- react-hot-toast (Notifications)
- date-fns (Date formatting)
- zustand (State management)
- axios (HTTP client)
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                                   │
└─────────────────────────────────────────────────────────────────────┘

CLIENT                      MIDDLEWARE                    SERVER
  │                            │                            │
  │  1. JWT Token              │                            │
  ├───────────────────────────>│  2. Verify Token           │
  │                            ├────────────┐               │
  │                            │            │               │
  │                            │<───────────┘               │
  │                            │                            │
  │                            │  3. Attach User            │
  │                            │     to Request             │
  │                            │                            │
  │                            ├───────────────────────────>│
  │                            │                            │
  │                            │                            │  4. Check
  │                            │                            │     Permissions
  │                            │                            ├──────┐
  │                            │                            │      │
  │                            │                            │<─────┘
  │                            │                            │
  │                            │  5. Process Request        │
  │                            │<───────────────────────────┤
  │                            │                            │
  │  6. Response               │                            │
  │<───────────────────────────┤                            │
  │                            │                            │

SOCKET.IO SECURITY:
- CORS Configuration
- Room Authorization
- Event Validation
- Rate Limiting (TODO)
- JWT Verification (TODO)
```

## Scalability Considerations

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SCALING STRATEGY                                  │
└─────────────────────────────────────────────────────────────────────┘

CURRENT (Single Server)          FUTURE (Scaled)

┌──────────────┐                ┌──────────────┐
│   Clients    │                │   Clients    │
└──────┬───────┘                └──────┬───────┘
       │                               │
       ▼                               ▼
┌──────────────┐                ┌──────────────┐
│ Socket.IO    │                │ Load Balancer│
│ Server       │                └──────┬───────┘
└──────┬───────┘                       │
       │                        ┌──────┴──────┐
       ▼                        │             │
┌──────────────┐         ┌──────▼───┐  ┌─────▼────┐
│   MongoDB    │         │ Server 1 │  │ Server 2 │
└──────────────┘         └──────┬───┘  └─────┬────┘
                                │            │
                                └──────┬─────┘
                                       │
                                ┌──────▼───────┐
                                │ Redis Adapter│
                                │ (Pub/Sub)    │
                                └──────┬───────┘
                                       │
                                ┌──────▼───────┐
                                │   MongoDB    │
                                └──────────────┘
```

This architecture provides a comprehensive view of how real-time features work in your GoFarm application!
