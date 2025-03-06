import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Disclaimer */}
          <div>
            <h3 className="uppercase font-bold mb-4">Disclaimer</h3>
            <p className="text-sm">This site is for people over the age of 21. Do not buy products on behalf of underage persons. Your location must not be in and around school or college premises.</p>
          </div>
          
          {/* Footer Menu */}
          <div>
            <h3 className="uppercase font-bold mb-4">Footer Menu</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-sm hover:text-gray-300">Search</Link></li>
              <li><Link to="/track" className="text-sm hover:text-gray-300">Track Your Order</Link></li>
              <li><a href="https://wa.me/919560220117" className="text-sm hover:text-gray-300">Whatsapp Us</a></li>
              <li><Link to="/contact" className="text-sm hover:text-gray-300">Contact Us</Link></li>
              <li><Link to="/cancel" className="text-sm hover:text-gray-300">Cancel Order</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-gray-300">FAQ</Link></li>
              <li><a href="tel:+919560220117" className="text-sm hover:text-gray-300">Orders Assistance: 9560220117</a></li>
              <li><Link to="/terms" className="text-sm hover:text-gray-300">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-sm hover:text-gray-300">Refund policy</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-gray-300">Shipping Policy</Link></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="uppercase font-bold mb-4">Follow Us</h3>
            <p className="mb-4">Watch our Uber cool content!</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-snapchat-ghost"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-spotify"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm">
          <p>Outontrip • Powered by Glassrock Traders LLP</p>
        </div>
      </div>
    </footer>
  );
};