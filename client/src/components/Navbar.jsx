import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const items = useCartStore(state => state.items);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">GOFaRm</Link>
      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/crops">Crops</Link>
        <Link to="/community">Community</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart ({items.length})</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
