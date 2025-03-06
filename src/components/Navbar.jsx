import React, { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex items-center w-1/4">
            <button className="mr-2">
              <Search className="h-5 w-5" />
            </button>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-black text-white w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link to="/" className="text-white text-xl font-bold">
              <img
                src="https://outontrip.com/cdn/shop/files/Website_logot_try_4_250x.jpg?v=1626083084"
                alt="OutOnTrip Logo"
                className="h-[50px]"
              />
            </Link>
          </div>
          
          {/* Account and Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="text-white">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="text-white relative">
              <ShoppingCart className="h-5 w-5" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        <hr className="my-4" />
        
        {/* Main Menu */}
        <div className="flex justify-center mt-4 space-x-6 text-sm">
          <Link to="/category/roll-your-own" className="hover:text-gray-300">Roll Your Own</Link>
          <Link to="/category/bong" className="hover:text-gray-300">Bong and Accessories</Link>
          <Link to="/category/pipes" className="hover:text-gray-300">Pipes</Link>
          <Link to="/category/crushers" className="hover:text-gray-300">Crushers</Link>
          <Link to="/category/machines" className="hover:text-gray-300">Rolling Machines</Link>
          <Link to="/category/storage" className="hover:text-gray-300">Storage</Link>
          <Link to="/category/holders" className="hover:text-gray-300">Cig Holders</Link>
          <Link to="/category/trays" className="hover:text-gray-300">Rolling Trays & Accessories</Link>
          <Link to="/category/ashtrays" className="hover:text-gray-300">Ashtrays</Link>
          <Link to="/category/lighters" className="hover:text-gray-300">Lighters</Link>
          <Link to="/category/merchandise" className="hover:text-gray-300">Merchandise</Link>
        </div>
        
        {/* Sub Menu */}
        <div className="flex justify-center mt-2 space-x-6 text-sm">
          <Link to="/combos" className="hover:text-gray-300">Combos</Link>
          <Link to="/brands" className="hover:text-gray-300">Brands</Link>
          <Link to="/aromas" className="hover:text-gray-300">Aromas & Candles</Link>
          <Link to="/hookah" className="hover:text-gray-300">Hookah</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};