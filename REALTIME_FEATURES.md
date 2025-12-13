# Real-Time Features Implementation Guide

## Overview
This document describes the real-time product updates and chat functionality implemented using Socket.IO in the GoFarm MERN application.

## Features Implemented

### 1. Real-Time Product Updates
- When a farmer adds a product, it instantly appears in retailer dashboards
- Product updates are broadcast to all connected clients
- Product deletions are reflected immediately
- No page refresh required

### 2. Real-Time Chat
- Live messaging between Farmers and Retailers
- Typing indicators
- Online/offline status
- Message delivery confirmation
- Negotiation support with real-time updates

## Backend Implementation

### Files Created/Modified

#### 1. `server/utils/socket.js` (NEW)
Socket.IO utility for handling real-time events:
- `initializeSocket()` - Initialize Socket.IO with event handlers
- `emitProductAdded()` - Broadcast new product to all clients
- `emitProductUpdated()` - Broadcast product updates
- `emitProductDeleted()` - Broadcast product deletion
- `emitNewMessage()` - Send message to chat room
- `emitNegotiationUpdate()` - Send negotiation updates

#### 2. `server/server.js` (MODIFIED)
- Imported socket utility
- Replaced basic socket handlers with utility functions
- Socket.IO configured with CORS support

#### 3. `server/controllers/product.controller.js` (MODIFIED)
- Added real-time event emissions on:
  - Product creation (`createProduct`)
  - Product update (`updateProduct`)
  - Product deletion (`deleteProduct`)

#### 4. `server/controllers/chat.controller.js` (MODIFIED)
- Updated to use socket utility functions
- Real-time message broadcasting
- Negotiation updates via sockets

## Frontend Implementation

### Files Created/Modified

#### 1. `client/src/context/SocketContext.jsx` (NEW)
React Context for Socket.IO connection:
- Manages socket connection lifecycle
- Auto-reconnection on disconnect
- Provides socket methods to components
- Joins user-specific rooms on authentication

**Usage:**
```javascript
import { useSocket } from '../context/SocketContext';

const { socket, connected, joinChatRoom, sendMessage } = useSocket();
```

#### 2. `client/src/hooks/useRealtimeProducts.js` (NEW)
Custom hook for real-time product updates:
- Listens for `product-added` events
- Listens for `product-updated` events
- Listens for `product-deleted` events
- Shows toast notifications

**Usage:**
```javascript
import { useRealtimeProducts } from '../hooks/useRealtimeProducts';

const handleProductAdded = (product) => {
  setProducts(prev => [product, ...prev]);
};

useRealtimeProducts(handleProductAdded, handleProductUpdated, handleProductDeleted);
```

#### 3. `client/src/hooks/useRealtimeChat.js` (NEW)
Custom hook for real-time chat:
- Auto-joins chat room
- Listens for new messages
- Handles typing indicators
- Manages negotiation updates

**Usage:**
```javascript
import { useRealtimeChat } from '../hooks/useRealtimeChat';

const { messages, setMessages, typingUsers, connected } = useRealtimeChat(chatId);
```

#### 4. `client/src/components/ChatRoom.jsx` (NEW)
Complete chat room component with:
- Real-time messaging
- Typing indicators
- Message history
- Negotiation display
- Auto-scroll to latest message

#### 5. `client/src/App.js` (MODIFIED)
- Wrapped app with `SocketProvider`
- All routes now have access to socket context

#### 6. `client/src/pages/retailer/RetailerProductsList.jsx` (MODIFIED)
- Integrated real-time product updates
- Shows "Live" indicator when connected
- Auto-updates product list without refresh

## Socket Events

### Product Events
| Event | Direction | Data | Description |
|-------|-----------|------|-------------|
| `product-added` | Server → Client | Product object | New product created |
| `product-updated` | Server → Client | Product object | Product modified |
| `product-deleted` | Server → Client | `{ productId }` | Product removed |

### Chat Events
| Event | Direction | Data | Description |
|-------|-----------|------|-------------|
| `join-chat-room` | Client → Server | `chatId` | Join specific chat |
| `leave-chat-room` | Client → Server | `chatId` | Leave chat room |
| `send-message` | Client → Server | Message data | Send message |
| `new-message` | Server → Client | Message object | New message received |
| `typing` | Client → Server | User info | User is typing |
| `user-typing` | Server → Client | User info | Show typing indicator |
| `stop-typing` | Client → Server | User info | User stopped typing |
| `user-stop-typing` | Server → Client | User info | Hide typing indicator |
| `negotiation-update` | Server → Client | Negotiation data | Negotiation status changed |

### User Events
| Event | Direction | Data | Description |
|-------|-----------|------|-------------|
| `join-user-room` | Client → Server | `userId` | Join personal room |
| `order-updated` | Server → Client | Order object | Order status changed |

## How It Works

### Product Updates Flow
1. Farmer creates/updates/deletes a product
2. Backend controller saves to database
3. Backend emits socket event to all connected clients
4. Retailer's `useRealtimeProducts` hook receives event
5. Callback updates local state
6. UI re-renders with new data
7. Toast notification shown

### Chat Flow
1. User opens chat with another user
2. `useRealtimeChat` hook joins chat room via socket
3. User types message and sends
4. Message saved to database via API
5. Backend emits `new-message` to chat room
6. Both users receive message via socket
7. Message appears instantly in UI

### Typing Indicator Flow
1. User types in message input
2. `emitTyping()` called on input change
3. Socket emits `typing` event to chat room
4. Other user receives `user-typing` event
5. Typing indicator shown
6. After 2 seconds of no typing, `stop-typing` emitted
7. Typing indicator hidden

## Configuration

### Environment Variables
```env
# Backend (.env)
CLIENT_URL=http://localhost:3000
PORT=5000

# Frontend (client/.env)
REACT_APP_API_URL=http://localhost:5000
```

### Socket.IO Configuration
```javascript
// Backend
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Frontend
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});
```

## Testing

### Test Real-Time Product Updates
1. Open retailer dashboard in one browser
2. Open farmer dashboard in another browser (or incognito)
3. Add a product as farmer
4. Verify product appears instantly in retailer dashboard
5. Update product details
6. Verify changes reflect immediately
7. Delete product
8. Verify product disappears from retailer view

### Test Real-Time Chat
1. Create chat between farmer and retailer
2. Open chat in two different browsers
3. Send message from one side
4. Verify message appears instantly on other side
5. Type in message box
6. Verify typing indicator shows on other side
7. Stop typing for 2 seconds
8. Verify typing indicator disappears

## Troubleshooting

### Socket Not Connecting
- Check if backend server is running
- Verify CORS configuration
- Check browser console for errors
- Ensure `CLIENT_URL` and `REACT_APP_API_URL` are correct

### Messages Not Appearing
- Verify user is authenticated
- Check if chat room is joined
- Look for socket events in browser console
- Verify backend is emitting events

### Products Not Updating
- Check if `SocketProvider` wraps the app
- Verify `useRealtimeProducts` hook is called
- Check callback functions are defined
- Look for socket connection status

## Performance Considerations

1. **Connection Management**: Socket connections are reused across components
2. **Room-Based Broadcasting**: Messages only sent to relevant chat rooms
3. **Auto-Reconnection**: Handles network interruptions gracefully
4. **Event Cleanup**: Listeners removed when components unmount
5. **Optimistic Updates**: UI updates immediately, syncs with server

## Security Notes

1. **Authentication**: Socket connections should verify JWT tokens
2. **Room Authorization**: Verify user can join requested rooms
3. **Rate Limiting**: Implement rate limits on message sending
4. **Input Validation**: Sanitize all user inputs
5. **CORS**: Properly configure allowed origins

## Future Enhancements

1. **Message Encryption**: End-to-end encryption for sensitive data
2. **File Sharing**: Support for images and documents in chat
3. **Voice/Video Calls**: WebRTC integration
4. **Push Notifications**: Browser notifications for new messages
5. **Read Receipts**: Track when messages are read
6. **Message Search**: Full-text search in chat history
7. **Group Chats**: Support for multiple participants
8. **Message Reactions**: Emoji reactions to messages

## Dependencies

### Backend
```json
{
  "socket.io": "^4.7.2"
}
```

### Frontend
```json
{
  "socket.io-client": "^4.7.2",
  "react-hot-toast": "^2.4.1",
  "date-fns": "^2.30.0"
}
```

## API Integration

The real-time features work alongside existing REST APIs:
- REST API for initial data fetch and persistence
- Socket.IO for real-time updates and notifications
- Hybrid approach ensures reliability and performance

## Conclusion

The real-time features enhance user experience by providing instant updates without page refreshes. The implementation is scalable, maintainable, and follows React best practices with custom hooks and context providers.
