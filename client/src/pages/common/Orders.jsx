import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
