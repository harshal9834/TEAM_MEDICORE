import React, { useState } from 'react';

const RetailerContact = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const retailers = {
    "Wheat": [
      { name: "Raj Traders", address: "Delhi", contact: "9876543210", rating: 4.8, verified: true },
      { name: "Mohan Retail", address: "Mumbai", contact: "9823456789", rating: 4.5, verified: true },
      { name: "Sharma Stores", address: "Bangalore", contact: "9811123456", rating: 4.7, verified: true },
      { name: "Patel Mart", address: "Ahmedabad", contact: "9908765432", rating: 4.6, verified: false },
      { name: "Singh Enterprises", address: "Kolkata", contact: "9987654321", rating: 4.9, verified: true }
    ],
    "Rice": [
      { name: "Krishna Traders", address: "Pune", contact: "9876543210", rating: 4.6, verified: true },
      { name: "Ravi Foods", address: "Hyderabad", contact: "9823456789", rating: 4.8, verified: true },
      { name: "Mehta Stores", address: "Surat", contact: "9811123456", rating: 4.3, verified: false },
      { name: "Gupta Enterprises", address: "Chennai", contact: "9908765432", rating: 4.7, verified: true },
      { name: "Yadav Mart", address: "Lucknow", contact: "9987654321", rating: 4.5, verified: true }
    ],
    "Corn": [
      { name: "Jain Agro", address: "Indore", contact: "9876543210", rating: 4.9, verified: true },
      { name: "Fresh Mart", address: "Nagpur", contact: "9823456789", rating: 4.4, verified: false },
      { name: "Kumar Groceries", address: "Patna", contact: "9811123456", rating: 4.6, verified: true }
    ],
    "Soybean": [
      { name: "Fernandes Mart", address: "Goa", contact: "9876543210", rating: 4.7, verified: true },
      { name: "Pawar Stores", address: "Nashik", contact: "9823456789", rating: 4.8, verified: true },
      { name: "Bose Agro", address: "Kanpur", contact: "9811123456", rating: 4.6, verified: true }
    ]
  };

  const products = [
    { name: 'Wheat', price: 30, available: '4,500+ kg', color: 'from-amber-200 to-amber-100', badge: 'Trending' },
    { name: 'Rice', price: 40, available: '3,200+ kg', color: 'from-yellow-200 to-yellow-100', badge: 'Popular' },
    { name: 'Corn', price: 25, available: '2,800+ kg', color: 'from-blue-200 to-blue-100', badge: null },
    { name: 'Soybean', price: 50, available: '2,100+ kg', color: 'from-green-200 to-green-100', badge: 'Organic' }
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

  const filteredRetailers = selectedProduct && retailers[selectedProduct]
    ? retailers[selectedProduct].filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button onClick={() => window.history.back()} className="mr-2">
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <i className="fas fa-leaf text-2xl text-green-200"></i>
            <h1 className="text-2xl font-bold">FarmConnect</h1>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
            <i className="fas fa-search text-green-100"></i>
            <input 
              type="text" 
              placeholder="Search retailers or products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent placeholder-green-100 text-white border-none outline-none w-64"
            />
          </div>
        </div>
      </header>

      <section className="w-full bg-gradient-to-b from-green-600 to-transparent py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Direct Farm to Retail Connection</h1>
          <p className="text-xl opacity-90 mb-8">Connect farmers with retailers for fresher produce and better prices</p>
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-green-800 flex items-center">
            <i className="fas fa-wheat-alt mr-3 text-green-600"></i>
            Available Products
          </h2>
          <div className="bg-green-100 px-4 py-2 rounded-full text-green-800 font-medium">
            <i className="fas fa-truck-fast mr-2"></i> Fresh Harvest Available
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div 
              key={index}
              onClick={() => setSelectedProduct(product.name)}
              className={`bg-gradient-to-br ${product.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                {product.badge && (
                  <span className="bg-white bg-opacity-70 px-2 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="text-gray-700 font-medium">₹{product.price}/kg</div>
              <div className="mt-2 text-xs text-gray-600">{product.available} available</div>
              <div className="mt-4 text-right">
                <i className="fas fa-chevron-right text-gray-500"></i>
              </div>
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
            <div className="text-gray-500">Active Retailers</div>
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
            <i className="fas fa-store text-2xl text-green-600 mr-3"></i>
            <h2 className="text-3xl font-semibold text-green-800">Retailers Looking to Buy</h2>
          </div>
          
          {!selectedProduct ? (
            <div className="bg-green-50 p-12 rounded-lg text-center">
              <i className="fas fa-hand-pointer text-6xl text-green-400 mb-4"></i>
              <p className="text-gray-600 text-lg">Click on a product above to see retailers interested in buying</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRetailers.map((retailer, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-green-700">{retailer.name}</h3>
                    {retailer.verified && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <i className="fas fa-check-circle mr-1"></i> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-amber-500 mb-3">
                    {generateStars(retailer.rating)}
                    <span className="text-gray-600 text-sm ml-2">({retailer.rating})</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                    <span>{retailer.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <i className="fas fa-phone mr-2 text-green-600"></i>
                    <span>{retailer.contact}</span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition duration-300">
                      <i className="far fa-bookmark"></i>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300">
                      Contact Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RetailerContact;
