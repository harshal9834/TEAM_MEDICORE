import { Link, useLocation } from 'react-router-dom';

const RetailerDashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <i className="fas fa-store mr-3"></i>
            Retailer Dashboard
          </h1>
          <p className="text-orange-100 mt-1">Manage your retail business efficiently</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/retailer/products" className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-gray-100 hover:border-orange-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
              <i className="fas fa-box-open text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Products</h3>
            <p className="text-gray-600">Browse and order products from farmers</p>
          </Link>
          
          <Link to="/retailer/inventory" className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <i className="fas fa-warehouse text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Inventory</h3>
            <p className="text-gray-600">Manage your stock and inventory</p>
          </Link>
          
          <Link to="/orders" className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-gray-100 hover:border-green-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <i className="fas fa-clipboard-list text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Orders</h3>
            <p className="text-gray-600">View and manage your orders</p>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 z-50">
        <div className="flex justify-around py-3 max-w-lg mx-auto">
          <Link 
            to="/retailer/dashboard" 
            className={`flex flex-col items-center transition-all ${
              isActive('/retailer/dashboard') ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/retailer/dashboard') 
                ? 'bg-orange-100 scale-110' 
                : 'bg-gray-100 hover:bg-orange-50'
            }`}>
              <i className="fas fa-home text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Home</span>
          </Link>
          
          <Link 
            to="/retailer/community" 
            className={`flex flex-col items-center transition-all ${
              isActive('/retailer/community') ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/retailer/community') 
                ? 'bg-orange-100 scale-110' 
                : 'bg-gray-100 hover:bg-orange-50'
            }`}>
              <i className="fas fa-edit text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Posts</span>
          </Link>
          
          <Link 
            to="/chat" 
            className={`flex flex-col items-center transition-all ${
              isActive('/chat') ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/chat') 
                ? 'bg-orange-100 scale-110' 
                : 'bg-gray-100 hover:bg-orange-50'
            }`}>
              <i className="fas fa-comments text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Chat</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center transition-all ${
              isActive('/profile') ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/profile') 
                ? 'bg-orange-100 scale-110' 
                : 'bg-gray-100 hover:bg-orange-50'
            }`}>
              <i className="fas fa-user text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default RetailerDashboard;
