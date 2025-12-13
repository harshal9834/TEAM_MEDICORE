# Real-Time Features Testing Guide

## Quick Start

### 1. Install Dependencies (if not already installed)

Backend already has `socket.io` installed.
Frontend already has `socket.io-client` installed.

### 2. Start the Application

```bash
# Terminal 1 - Start Backend
npm run dev

# Terminal 2 - Start Frontend
cd client
npm start
```

### 3. Test Real-Time Product Updates

#### Setup:
1. Open browser window 1: Login as **Retailer**
2. Navigate to: Retailer Dashboard → "View All Products from Farmers"
3. Open browser window 2 (or incognito): Login as **Farmer**
4. Navigate to: Farmer Dashboard → "Add Products"

#### Test Cases:

**Test 1: Add New Product**
- In Farmer window: Fill product form and click "Add Product"
- In Retailer window: Watch for:
  - Toast notification: "New product available: [Product Name]"
  - Product card appears instantly at top of list
  - "Live" indicator shows green dot in header

**Test 2: Update Product**
- In Farmer window: Edit an existing product
- In Retailer window: Watch product card update instantly

**Test 3: Delete Product**
- In Farmer window: Delete a product
- In Retailer window: Watch product disappear with toast notification

### 4. Test Real-Time Chat

#### Setup:
1. Browser window 1: Login as **Farmer**
2. Browser window 2: Login as **Retailer**
3. Create a chat between them (use "Chat" or "Contact" features)

#### Test Cases:

**Test 1: Send Messages**
- Window 1: Type and send a message
- Window 2: Message appears instantly without refresh
- Verify timestamp and sender info

**Test 2: Typing Indicator**
- Window 1: Start typing (don't send)
- Window 2: See "User is typing..." with animated dots
- Window 1: Stop typing for 2 seconds
- Window 2: Typing indicator disappears

**Test 3: Multiple Messages**
- Send several messages back and forth
- Verify all messages appear in correct order
- Check auto-scroll to latest message

**Test 4: Connection Status**
- Check "Online" indicator in chat header
- Disconnect internet briefly
- Verify reconnection happens automatically

### 5. Test Negotiation (if implemented)

1. Retailer sends negotiation offer for a product
2. Farmer receives offer instantly
3. Farmer accepts/rejects/counters
4. Retailer sees response immediately

## Expected Behavior

### Product Updates
✅ New products appear without refresh
✅ Toast notifications show for new products
✅ "Live" indicator shows when connected
✅ Updates happen within 1 second
✅ Multiple retailers see same updates

### Chat
✅ Messages appear instantly (< 500ms)
✅ Typing indicator works smoothly
✅ Auto-scroll to new messages
✅ Online status accurate
✅ Messages persist after refresh

## Troubleshooting

### Issue: Socket not connecting

**Check:**
```javascript
// In browser console
console.log('Socket connected:', socket.connected);
```

**Solution:**
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in client/.env
- Look for CORS errors in console

### Issue: Products not updating

**Check:**
1. Open browser DevTools → Network tab
2. Look for WebSocket connection
3. Check Console for socket events

**Solution:**
- Ensure SocketProvider wraps App component
- Verify useRealtimeProducts hook is called
- Check callback functions are defined

### Issue: Messages not appearing

**Check:**
```javascript
// In browser console
socket.on('new-message', (data) => {
  console.log('Message received:', data);
});
```

**Solution:**
- Verify chat room is joined
- Check chatId is correct
- Ensure user is authenticated

## Console Debugging

### Backend Console
You should see:
```
✅ Socket connected: [socket-id]
User [userId] joined their room
User joined chat room: [chatId]
📦 Product added event emitted: [productId]
💬 New message emitted to chat: [chatId]
```

### Frontend Console
You should see:
```
✅ Socket connected: [socket-id]
📦 New product added: [product-object]
💬 New message received: [message-object]
```

## Performance Metrics

### Expected Response Times
- Product update propagation: < 1 second
- Message delivery: < 500ms
- Typing indicator: < 200ms
- Reconnection: < 3 seconds

### Load Testing
Test with multiple users:
1. Open 5+ browser tabs as different users
2. Send messages simultaneously
3. Add products from multiple farmers
4. Verify all updates propagate correctly

## Browser Compatibility

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Mobile Testing

1. Open app on mobile browser
2. Test chat functionality
3. Verify product updates work
4. Check responsive design

## Network Conditions

Test under different conditions:
1. **Good Connection**: All features work smoothly
2. **Slow 3G**: Messages may delay but eventually deliver
3. **Offline**: Reconnects automatically when back online
4. **Intermittent**: Handles disconnects gracefully

## Common Test Scenarios

### Scenario 1: Busy Marketplace
1. 3 Farmers adding products simultaneously
2. 5 Retailers viewing product list
3. All retailers see all products instantly
4. No duplicates or missing products

### Scenario 2: Active Chat
1. Farmer and Retailer chatting
2. Negotiating product prices
3. Sending multiple messages quickly
4. All messages delivered in order

### Scenario 3: Network Issues
1. User loses connection
2. Sends messages while offline
3. Connection restored
4. Messages sync correctly

## Success Criteria

✅ All product updates appear within 1 second
✅ Chat messages deliver within 500ms
✅ No duplicate messages or products
✅ Typing indicators work smoothly
✅ Auto-reconnection works
✅ No console errors
✅ UI remains responsive
✅ Multiple users can interact simultaneously

## Reporting Issues

If you find bugs, note:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Console errors
5. Network tab screenshots

## Next Steps

After testing:
1. Review REALTIME_FEATURES.md for implementation details
2. Check API_DOCUMENTATION.md for REST endpoints
3. Explore additional features in the app
4. Provide feedback for improvements

## Demo Video Script

1. **Introduction** (30 sec)
   - Show both farmer and retailer dashboards side by side

2. **Product Updates** (1 min)
   - Farmer adds product
   - Show instant appearance in retailer view
   - Highlight "Live" indicator

3. **Chat Demo** (1 min)
   - Send messages back and forth
   - Show typing indicator
   - Demonstrate negotiation

4. **Conclusion** (30 sec)
   - Highlight benefits: No refresh needed, instant updates, better UX

Total: ~3 minutes

## Support

For questions or issues:
1. Check REALTIME_FEATURES.md documentation
2. Review code comments in socket.js
3. Check browser console for errors
4. Test with different browsers/devices
