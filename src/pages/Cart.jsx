import React, { useState, useEffect, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const Cart = () => {
  const { user, updateUserAddress } = useContext(AuthContext);
  const { state, dispatch } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(user?.address || '');
  const [error, setError] = useState('');

  useEffect(() => { if (user) setNewAddress(user.address || ''); }, [user]);

  const updateQuantity = (id, quantity) => { if (quantity >= 1) dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }); };
  const removeItem = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  const handleCheckout = () => {
    if (!user.address) {
      setError('Please add an address before checkout');
      setIsEditing(true);
    }
  };

  const handleAddressSubmit = async () => {
    if (!newAddress.trim()) return setError('Address cannot be empty');
    try {
      const response = await updateUserAddress(newAddress);
      if (response.success) setIsEditing(false), setError('');
      else setError(response.message || 'Failed to update address.');
    } catch {
      setError('Failed to update address. Please try again.');
    }
  };

  if (!user) return (
    <div className="text-center font-bold">
      You are not logged in... <Link to="/login" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">Login</Link>
    </div>
  );

  if (!state.items.length) return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2><br />
      <Link to="/" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart, {user.username}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {state.items.map(({ id, image, name, price, quantity }) => (
            <div key={id} className="flex items-center space-x-4 border-b py-4">
              <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-gray-600">₹{price.toFixed(2)}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button onClick={() => updateQuantity(id, quantity - 1)} className="text-gray-500 hover:text-black"><Minus className="w-4 h-4" /></button>
                  <span>{quantity}</span>
                  <button onClick={() => updateQuantity(id, quantity + 1)} className="text-gray-500 hover:text-black"><Plus className="w-4 h-4" /></button>
                  <button onClick={() => removeItem(id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-lg font-medium">₹{(price * quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{state.total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="border-t pt-2 mt-2 flex justify-between"><span className="text-lg font-bold">Total</span><span className="text-lg font-bold">₹{state.total.toFixed(2)}</span></div>
          </div>
          <div className='mt-4'>
            <h2 className='font-bold mb-4'>Payment Method</h2>
            <input type="radio" name="Cash On Delivery" defaultChecked/><span className='ml-1'>Cash On Delivery</span>
          </div>
          <hr className="my-4" />
          <div className='mt-4'>
            <h2 className='font-bold mb-4'>Address</h2>
            {!isEditing ? (
              <div className='flex items-center gap-2'>
                <span>{user.address || <span className="text-red-500">No address added.</span>}</span>
                <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-black"><Edit className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Enter your delivery address" className="w-full p-2 border rounded-md" rows={3} />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex space-x-2">
                  <button onClick={handleAddressSubmit} className="bg-black text-white py-2 px-4 rounded-md">Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">Cancel</button>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleCheckout} className="w-full mt-6 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};
