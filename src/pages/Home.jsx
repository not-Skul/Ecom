import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Features } from '../components/Features';

export const Home = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src="https://outontrip.com/cdn/shop/files/OutonTrip_8_Inch_Glass_-_Banner_DESKTOP.png?v=1732355219&width=2000"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Shop By Category */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                image: "https://outontrip.com/cdn/shop/files/4_61771cfa-25eb-434a-8afc-16c58771c009_600x.jpg?v=1644591198",
                subtitle: "SLIDE UNDER BED",
                title: "STORAGE/STASH BOXES"
              },
              {
                image: "https://outontrip.com/cdn/shop/files/4_61771cfa-25eb-434a-8afc-16c58771c009_600x.jpg?v=1644591198",
                subtitle: "MOST ESSENTIAL",
                title: "FILTER TIPS"
              },
              {
                image: "https://outontrip.com/cdn/shop/files/5_934d28a9-1fbf-47e6-b397-585855f99c79_600x.jpg?v=1644591198",
                subtitle: "CARBON ACTIVATED",
                title: "CHARCOAL FILTERS"
              },
              {
                image: "https://outontrip.com/cdn/shop/files/6_6a2d88cc-fb19-4bea-96d2-75aafbf1f2fe_700x.jpg?v=1644591198",
                subtitle: "ROLL IN SECONDS",
                title: "ROLLING MACHINE"
              }
            ].map((category, index) => (
              <div key={index} className="relative group overflow-hidden">
                <img src={category.image} alt={category.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
                  <span className="text-white text-sm">{category.subtitle}</span>
                  <h3 className="text-white text-xl font-bold mt-2">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center mb-2 text-sm">SCROLL TO YOUR FAV. PRODUCT</p>
          <h2 className="text-3xl font-bold text-center mb-8">EXPLORE</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product) => ( //for showing fewer products...use slice
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white p-4 rounded shadow-sm group"
              >
                <div className="relative">
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1">
                      SAVE {product.discount}%
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-bold">Rs. {product.price.toFixed(2)}</span>
                    <button className="px-3 py-1 bg-black text-white text-sm">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />
    </div>
  );
};