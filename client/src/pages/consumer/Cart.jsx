import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 30,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1546470427-227e2e2e4e8e?w=400',
      category: 'Vegetables'
    },
    {
      id: 2,
      name: 'Fresh Mangoes',
      price: 80,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
      category: 'Fruits'
    },
    {
      id: 3,
      name: 'Basmati Rice',
      price: 120,
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      category: 'Grains'
    }
  ]);

  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const moveToWishlist = (item) => {
    setCartItems(cartItems.filter(i => i.id !== item.id));
    showToast(`${item.name} moved to wishlist`);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const deliveryFee = 40;
  const total = getSubtotal() + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-4 hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition">
                <i className="fas fa-arrow-left text-xl"></i>
              </button>
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <i className="fas fa-shopping-cart mr-3"></i>
                  Shopping Cart
                </h1>
                <p className="text-blue-100 mt-1">{cartItems.length} items in cart</p>
              </div>
            </div>
            <Link to="/consumer/wishlist" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition">
              <i className="fas fa-heart mr-2"></i>
              Wishlist
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <i className="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link
                to="/consumer/shop"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg inline-block hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">{item.category}</div>
                      <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                      <div className="text-2xl font-bold text-green-600 mt-1">
                        ₹{item.price} <span className="text-sm text-gray-500">per kg</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                        >
                          <i className="fas fa-minus text-sm"></i>
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                        >
                          <i className="fas fa-plus text-sm"></i>
                        </button>
                      </div>
                      <div className="text-xl font-bold text-gray-800">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                    <button
                      onClick={() => moveToWishlist(item)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center"
                    >
                      <i className="fas fa-heart mr-2"></i>
                      Move to Wishlist
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition flex items-center"
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">₹{deliveryFee}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                >
                  <i className="fas fa-lock mr-2"></i>
                  Proceed to Checkout
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                    Secure checkout
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-truck text-green-600 mr-2"></i>
                    Free delivery on orders above ₹500
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-undo text-green-600 mr-2"></i>
                    Easy returns within 7 days
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
                <h3 className="font-bold text-gray-800 mb-3">Have a promo code?</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <i className="fas fa-check-circle mr-2"></i>
          {toast.message}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 z-50">
        <div className="flex justify-around py-3 max-w-lg mx-auto">
          <Link to="/consumer/dashboard" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition">
            <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-1 hover:bg-blue-50">
              <i className="fas fa-home text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link to="/consumer/shop" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition">
            <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-1 hover:bg-blue-50">
              <i className="fas fa-shopping-bag text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Shop</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-blue-600">
            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-1 scale-110">
              <i className="fas fa-shopping-cart text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition">
            <div className="rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center mb-1 hover:bg-blue-50">
              <i className="fas fa-user text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Cart;
