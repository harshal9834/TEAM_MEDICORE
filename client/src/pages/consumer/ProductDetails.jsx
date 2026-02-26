import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { useCartStore } from '../../store/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore(state => state.addItem);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-200 relative">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]?.url?.startsWith('http') ? product.images[0].url : `http://localhost:5000${product.images[0]?.url || ''}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Only fallback once to prevent infinite loops
                      if (!e.target.dataset.fallbackAttempted) {
                        e.target.dataset.fallbackAttempted = 'true';
                        e.target.src = `http://localhost:5000/image/dari.jpeg`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <i className="fas fa-image text-6xl text-gray-400 mb-2"></i>
                    <span className="text-sm text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-green-600">₹{product.price}/{product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium">{product.quantity} {product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                {product.seller && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seller:</span>
                    <span className="font-medium">{product.seller.name}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-6">
                {product.organic && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-leaf mr-1"></i>Organic
                  </span>
                )}
                {product.certified && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <i className="fas fa-certificate mr-1"></i>Certified
                  </span>
                )}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                disabled={product.quantity === 0}
              >
                <i className="fas fa-cart-plus mr-2"></i>
                {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
