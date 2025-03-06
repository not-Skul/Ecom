import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-xl font-bold text-indigo-600">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
          
          <button
            onClick={handleAddToCart}
            className="mt-8 flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};