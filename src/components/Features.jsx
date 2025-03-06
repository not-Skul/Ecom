import React from 'react';
import { Phone, Package, Truck, Lock } from 'lucide-react';

export const Features = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="uppercase font-bold mb-2">Have a query? Give us a call!</h3>
            <p className="text-sm">Call us or drop a message on WhatsApp anytime at +91-95602 20117 But only from Monday to Friday :P</p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="uppercase font-bold mb-2">Not revealing what's inside</h3>
            <p className="text-sm">No one would know what's inside the package. Everything is packaged discreetly and delivered to your doorstep.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="uppercase font-bold mb-2">Free shipping on pre-paid orders</h3>
            <p className="text-sm">Get free shipping pan India on all online paid orders above ₹1999</p>
          </div>
          
          {/* Feature 4 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="uppercase font-bold mb-2">100% secure payments</h3>
            <p className="text-sm">All payment gateways are safe, secure and encrypted. No hidden cost or extra charge, kasam se!</p>
          </div>
        </div>
      </div>
    </section>
  );
};