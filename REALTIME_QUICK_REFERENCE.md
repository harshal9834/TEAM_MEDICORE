# Real-Time Features Quick Reference

## 🚀 Quick Start Commands

```bash
# Start backend
npm run dev

# Start frontend (in new terminal)
cd client
npm start
```

## 📡 Socket Events

### Product Events
| Event | Data | Description |
|-------|------|-------------|
| `product-added` | `Product` | New product created |
| `product-updated` | `Product` | Product modified |
| `product-deleted` | `{productId}` | Product removed |

### Chat Events
| Event | Data | Description |
|-------|------|-------------|
| `join-chat-room` | `chatId` | Join chat |
| `new-message` | `{chatId, message}` | New message |
| `typing` | `{chatId, userId, userName}` | User typing |
| `user-typing` | `{userId, userName}` | Show typing |
| `stop-typing` | `{chatId, userId}` | Stop typing |
| `negotiation-update` | `{chatId, ...}` | Negotiation changed |

## 💻 Code Snippets

### Use Real-Time Products
```javascript
import { useRealtimeProducts } from '../hooks/useRealtimeProducts';

const [products, setProducts] = useState([]);

useRealtimeProducts(
  (newProduct) => setProducts(prev => [newProduct, ...prev]),
  (updated) => setProducts(prev => prev.map(p => p._id === updated._id ? updated : p)),
  (deletedId) => setProducts(prev => prev.filter(p => p._id !== deletedId))
);
```

### Use Real-Time Chat
```javascript
import { useRealtimeChat } from '../hooks/useRealtimeChat';

const { messages, typingUsers, connected } = useRealtimeChat(chatId);
```

### Access Socket Directly
```javascript
import { useSocket } from '../context/SocketContext';

const { socket, connected, joinChatRoom, sendMessage } = useSocket();
```

### Emit Custom Event
```javascript
const { socket, connected } = useSocket();

if (socket && connected) {
  socket.emit('custom-event', { data: 'value' });
}
```

### Listen for Custom Event
```javascript
useEffect(() => {
  if (!socket || !connected) return;
  
  const handler = (data) => console.log(data);
  socket.on('custom-event', handler);
  
  return () => socket.off('custom-event', handler);
}, [socket, connected]);
```

## 🔧 Backend Emit Events

### Emit Product Event
```javascript
const { emitProductAdded } = require('../utils/socket');

// After saving product
emitProductAdded(product);
```

### Emit Chat Message
```javascript
const { emitNewMessage } = require('../utils/socket');

emitNewMessage(chatId, {
  chatId,
  message: newMessage
});
```

### Emit to Specific User
```javascript
const io = req.app.get('io');
io.to(`user-${userId}`).emit('notification', data);
```

## 🎯 Common Patterns

### Show Connection Status
```javascript
const { connected } = useSocket();

return (
  <div>
    {connected ? (
      <span className="text-green-500">● Online</span>
    ) : (
      <span className="text-red-500">● Offline</span>
    )}
  </div>
);
```

### Handle Typing Indicator
```javascript
const { emitTyping, emitStopTyping } = useSocket();
const timeoutRef = useRef(null);

const handleTyping = () => {
  emitTyping(chatId, userId, userName);
  
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  
  timeoutRef.current = setTimeout(() => {
    emitStopTyping(chatId, userId);
  }, 2000);
};
```

### Optimistic Update
```javascript
const sendMessage = async (content) => {
  // Add to UI immediately
  const tempMessage = { _id: 'temp', content, sender: currentUser };
  setMessages(prev => [...prev, tempMessage]);
  
  try {
    // Send to server
    const response = await chatAPI.sendMessage({ chatId, content });
    
    // Replace temp with real message
    setMessages(prev => 
      prev.map(m => m._id === 'temp' ? response.data.message : m)
    );
  } catch (error) {
    // Remove temp message on error
    setMessages(prev => prev.filter(m => m._id !== 'temp'));
    toast.error('Failed to send');
  }
};
```

## 🐛 Debugging

### Check Connection
```javascript
// Browser console
console.log('Connected:', socket.connected);
console.log('Socket ID:', socket.id);
```

### Monitor Events
```javascript
// Listen to all events
socket.onAny((event, ...args) => {
  console.log('Event:', event, 'Data:', args);
});
```

### Backend Logs
```javascript
// server/utils/socket.js already logs:
// ✅ Socket connected: [id]
// 📦 Product added event emitted: [id]
// 💬 New message emitted to chat: [id]
```

## 📁 File Locations

### Backend
- `server/utils/socket.js` - Socket utility
- `server/server.js` - Socket initialization
- `server/controllers/product.controller.js` - Product events
- `server/controllers/chat.controller.js` - Chat events

### Frontend
- `client/src/context/SocketContext.jsx` - Socket context
- `client/src/hooks/useRealtimeProducts.js` - Product hook
- `client/src/hooks/useRealtimeChat.js` - Chat hook
- `client/src/components/ChatRoom.jsx` - Chat component
- `client/src/examples/RealtimeExample.jsx` - Examples

## 🔐 Environment Variables

```env
# Backend (.env)
CLIENT_URL=http://localhost:3000
PORT=5000

# Frontend (client/.env)
REACT_APP_API_URL=http://localhost:5000
```

## ⚡ Performance Tips

1. **Use useCallback** for event handlers
2. **Cleanup listeners** in useEffect return
3. **Debounce typing** events (2 seconds)
4. **Limit payload size** in events
5. **Use rooms** for targeted broadcasting

## 🎨 UI Components

### Live Indicator
```javascript
{connected && (
  <span className="flex items-center text-green-500">
    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
    Live
  </span>
)}
```

### Typing Indicator
```javascript
{typingUsers.length > 0 && (
  <div className="flex items-center text-gray-500">
    <div className="flex space-x-1 mr-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
    {typingUsers[0].userName} is typing...
  </div>
)}
```

## 📊 Testing URLs

- **Retailer Products**: http://localhost:3000/retailer/products-list
- **Farmer Add Product**: http://localhost:3000/farmer/add-products
- **Chat**: http://localhost:3000/chat

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Socket not connecting | Check backend is running, verify CORS |
| Events not received | Check room is joined, verify event name |
| Duplicate messages | Ensure cleanup in useEffect |
| Memory leak | Remove event listeners on unmount |
| Slow updates | Check network tab, optimize payload |

## 📚 Documentation

- **Full Docs**: `REALTIME_FEATURES.md`
- **Testing**: `REALTIME_TESTING_GUIDE.md`
- **Summary**: `REALTIME_IMPLEMENTATION_SUMMARY.md`
- **Examples**: `client/src/examples/RealtimeExample.jsx`

## 🎯 Key Concepts

1. **Context Provider** - Manages socket connection globally
2. **Custom Hooks** - Encapsulate real-time logic
3. **Event Emitters** - Backend broadcasts events
4. **Event Listeners** - Frontend receives events
5. **Rooms** - Isolate messages to specific groups
6. **Auto-Reconnect** - Handles network issues

## ✅ Quick Test

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
cd client && npm start

# Browser 1: Login as Retailer → View Products
# Browser 2: Login as Farmer → Add Product
# Result: Product appears instantly in Browser 1
```

## 🚀 That's It!

You now have everything you need to work with real-time features in your GoFarm app!

**Remember:**
- Always check `connected` before emitting
- Clean up listeners in useEffect
- Use callbacks to prevent re-renders
- Handle errors gracefully
- Show connection status to users

Happy coding! 🎉
