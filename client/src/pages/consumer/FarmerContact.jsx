import React, { useState } from 'react';

const FarmerContact = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const farmers = {
    "Wheat": [
      { name: "Ramesh Kumar", address: "Punjab", contact: "9876543210", rating: 4.8, verified: true, farmSize: "25 acres" },
      { name: "Suresh Patel", address: "Haryana", contact: "9823456789", rating: 4.5, verified: true, farmSize: "18 acres" },
      { name: "Vijay Singh", address: "Uttar Pradesh", contact: "9811123456", rating: 4.7, verified: true, farmSize: "30 acres" },
      { name: "Mahesh Yadav", address: "Madhya Pradesh", contact: "9908765432", rating: 4.6, verified: false, farmSize: "15 acres" },
      { name: "Rajesh Sharma", address: "Rajasthan", contact: "9987654321", rating: 4.9, verified: true, farmSize: "22 acres" }
    ],
    "Rice": [
      { name: "Krishna Reddy", address: "Andhra Pradesh", contact: "9876543210", rating: 4.6, verified: true, farmSize: "20 acres" },
      { name: "Ravi Kumar", address: "Tamil Nadu", contact: "9823456789", rating: 4.8, verified: true, farmSize: "28 acres" },
      { name: "Mohan Das", address: "West Bengal", contact: "9811123456", rating: 4.3, verified: false, farmSize: "12 acres" },
      { name: "Ganesh Naik", address: "Odisha", contact: "9908765432", rating: 4.7, verified: true, farmSize: "16 acres" },
      { name: "Prakash Jha", address: "Bihar", contact: "9987654321", rating: 4.5, verified: true, farmSize: "14 acres" }
    ],
    "Vegetables": [
      { name: "Anil Jadhav", address: "Maharashtra", contact: "9876543210", rating: 4.9, verified: true, farmSize: "8 acres" },
      { name: "Sunil Patil", address: "Karnataka", contact: "9823456789", rating: 4.4, verified: false, farmSize: "10 acres" },
      { name: "Deepak Verma", address: "Gujarat", contact: "9811123456", rating: 4.6, verified: true, farmSize: "6 acres" }
    ],
    "Fruits": [
      { name: "Kiran Desai", address: "Maharashtra", contact: "9876543210", rating: 4.7, verified: true, farmSize: "12 acres" },
      { name: "Ashok Pawar", address: "Himachal Pradesh", contact: "9823456789", rating: 4.8, verified: true, farmSize: "15 acres" },
      { name: "Dinesh Thakur", address: "Uttarakhand", contact: "9811123456", rating: 4.6, verified: true, farmSize: "10 acres" }
    ],
    "Pulses": [
      { name: "Gopal Meena", address: "Rajasthan", contact: "9876543210", rating: 4.5, verified: true, farmSize: "20 acres" },
      { name: "Harish Choudhary", address: "Madhya Pradesh", contact: "9823456789", rating: 4.7, verified: true, farmSize: "18 acres" },
      { name: "Mukesh Jat", address: "Uttar Pradesh", contact: "9811123456", rating: 4.4, verified: false, farmSize: "16 acres" }
    ],
    "Spices": [
      { name: "Thomas Joseph", address: "Kerala", contact: "9876543210", rating: 4.9, verified: true, farmSize: "5 acres" },
      { name: "Raju Nair", address: "Karnataka", contact: "9823456789", rating: 4.6, verified: true, farmSize: "7 acres" },
      { name: "Sanjay Pillai", address: "Tamil Nadu", contact: "9811123456", rating: 4.8, verified: true, farmSize: "6 acres" }
    ]
  };

  const products = [
    { name: 'Wheat', price: 30, available: '4,500+ kg', color: 'from-amber-200 to-amber-100', badge: 'Trending', icon: 'fa-wheat-awn' },
    { name: 'Rice', price: 40, available: '3,200+ kg', color: 'from-yellow-200 to-yellow-100', badge: 'Popular', icon: 'fa-bowl-rice' },
    { name: 'Vegetables', price: 35, available: '2,800+ kg', color: 'from-green-200 to-green-100', badge: 'Fresh', icon: 'fa-carrot' },
    { name: 'Fruits', price: 60, available: '1,500+ kg', color: 'from-red-200 to-red-100', badge: 'Organic', icon: 'fa-apple-whole' },
    { name: 'Pulses', price: 80, available: '2,100+ kg', color: 'from-orange-200 to-orange-100', badge: null, icon: 'fa-seedling' },
    { name: 'Spices', price: 150, available: '800+ kg', color: 'from-purple-200 to-purple-100', badge: 'Premium', icon: 'fa-pepper-hot' }
  ];

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    return stars;
  };

  const filteredFarmers = selectedProduct && farmers[selectedProduct]
    ? farmers[selectedProduct].filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button onClick={() => window.history.back()} className="mr-2 hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition">
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <i className="fas fa-tractor text-2xl text-green-200"></i>
            <h1 className="text-2xl font-bold">FarmConnect</h1>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
            <i className="fas fa-search text-green-100"></i>
            <input 
              type="text" 
              placeholder="Search farmers or products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent placeholder-green-100 text-white border-none outline-none w-64"
            />
          </div>
        </div>
      </header>

      <section className="w-full bg-gradient-to-b from-green-600 to-transparent py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect Directly with Farmers</h1>
          <p className="text-xl opacity-90 mb-8">Get fresh produce directly from the source at the best prices</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
              <i className="fas fa-check-circle mr-2"></i>
              100% Fresh
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
              <i className="fas fa-shield-alt mr-2"></i>
              Verified Farmers
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
              <i className="fas fa-truck mr-2"></i>
              Direct Delivery
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-green-800 flex items-center">
            <i className="fas fa-leaf mr-3 text-green-600"></i>
            Available Products
          </h2>
          <div className="bg-green-100 px-4 py-2 rounded-full text-green-800 font-medium">
            <i className="fas fa-truck-fast mr-2"></i> Fresh Harvest Available
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {products.map((product, index) => (
            <div 
              key={index}
              onClick={() => setSelectedProduct(product.name)}
              className={`bg-gradient-to-br ${product.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer ${selectedProduct === product.name ? 'ring-4 ring-green-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <i className={`fas ${product.icon} text-3xl text-gray-700`}></i>
                {product.badge && (
                  <span className="bg-white bg-opacity-70 px-2 py-1 rounded-full text-xs font-medium">
                    {product.badge}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
              <div className="text-gray-700 font-medium">₹{product.price}/kg</div>
              <div className="mt-2 text-xs text-gray-600">{product.available}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center bg-white rounded-2xl shadow-md p-6 mb-12">
          <div className="text-center px-6 py-3">
            <div className="text-3xl font-bold text-green-600">3,500+</div>
            <div className="text-gray-500">Registered Farmers</div>
          </div>
          <div className="text-center px-6 py-3">
            <div className="text-3xl font-bold text-green-600">1,200+</div>
            <div className="text-gray-500">Active Buyers</div>
          </div>
          <div className="text-center px-6 py-3">
            <div className="text-3xl font-bold text-green-600">₹4.2 Cr</div>
            <div className="text-gray-500">Trade Volume</div>
          </div>
          <div className="text-center px-6 py-3">
            <div className="text-3xl font-bold text-green-600">15+</div>
            <div className="text-gray-500">Product Categories</div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-10 mb-16">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <i className="fas fa-users text-2xl text-green-600 mr-3"></i>
            <h2 className="text-3xl font-semibold text-green-800">Farmers Selling Products</h2>
          </div>
          
          {!selectedProduct ? (
            <div className="bg-green-50 p-12 rounded-lg text-center">
              <i className="fas fa-hand-pointer text-6xl text-green-400 mb-4"></i>
              <p className="text-gray-600 text-lg">Click on a product above to see farmers selling it</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarmers.map((farmer, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-green-700">{farmer.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <i className="fas fa-farm mr-1"></i>
                        {farmer.farmSize}
                      </p>
                    </div>
                    {farmer.verified && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <i className="fas fa-check-circle mr-1"></i> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-amber-500 mb-3">
                    {generateStars(farmer.rating)}
                    <span className="text-gray-600 text-sm ml-2">({farmer.rating})</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                    <span>{farmer.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <i className="fas fa-phone mr-2 text-green-600"></i>
                    <span>{farmer.contact}</span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition duration-300">
                      <i className="far fa-bookmark"></i>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                      <i className="fas fa-phone mr-2"></i>
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-10 mb-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Why Buy Directly from Farmers?</h3>
              <p className="text-green-100">Get the freshest produce at the best prices</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <i className="fas fa-percentage text-4xl mb-2"></i>
                <p className="font-semibold">Save 30-40%</p>
                <p className="text-sm text-green-100">On market prices</p>
              </div>
              <div className="text-center">
                <i className="fas fa-leaf text-4xl mb-2"></i>
                <p className="font-semibold">100% Fresh</p>
                <p className="text-sm text-green-100">Farm to table</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerContact;
