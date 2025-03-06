import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b border-gray-200 py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-gray-500 hover:text-black"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="text-gray-900">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-black"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{state.total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">Free</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{state.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};