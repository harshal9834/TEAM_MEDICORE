import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection - use base URL without /api for socket connection
    const baseUrl = process.env.REACT_APP_API_URL ? 
      process.env.REACT_APP_API_URL.replace('/api', '') : 
      'http://localhost:5000';
    
    const newSocket = io(baseUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id);
      setConnected(true);

      // Join user room if authenticated
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user._id) {
        newSocket.emit('join-user-room', user._id);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinChatRoom = (chatId) => {
    if (socket && connected) {
      socket.emit('join-chat-room', chatId);
    }
  };

  const leaveChatRoom = (chatId) => {
    if (socket && connected) {
      socket.emit('leave-chat-room', chatId);
    }
  };

  const sendMessage = (chatId, message) => {
    if (socket && connected) {
      socket.emit('send-message', { chatId, ...message });
    }
  };

  const emitTyping = (chatId, userId, userName) => {
    if (socket && connected) {
      socket.emit('typing', { chatId, userId, userName });
    }
  };

  const emitStopTyping = (chatId, userId) => {
    if (socket && connected) {
      socket.emit('stop-typing', { chatId, userId });
    }
  };

  const value = {
    socket,
    connected,
    joinChatRoom,
    leaveChatRoom,
    sendMessage,
    emitTyping,
    emitStopTyping
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
