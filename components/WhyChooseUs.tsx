import React from 'react';
import { FEATURES } from '../constants';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-saffron-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Why Choose Tiffin Tales?</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron-100 text-saffron-600 mb-6">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="bg-white rounded-3xl p-10 lg:p-16 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-veggreen-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
             <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold text-center mb-12">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8 text-center relative">
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                    <div className="bg-white pt-4">
                        <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white">1</div>
                        <h4 className="text-lg font-bold mb-2">Choose Your Plan</h4>
                        <p className="text-gray-500">Select Basic or Deluxe based on your appetite.</p>
                    </div>
                    <div className="bg-white pt-4">
                        <div className="w-16 h-16 bg-saffron-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white">2</div>
                        <h4 className="text-lg font-bold mb-2">We Cook Fresh</h4>
                        <p className="text-gray-500">Our chefs prepare meals daily with love.</p>
                    </div>
                    <div className="bg-white pt-4">
                        <div className="w-16 h-16 bg-veggreen-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white">3</div>
                        <h4 className="text-lg font-bold mb-2">Delivered Free</h4>
                        <p className="text-gray-500">Enjoy hot meals at your doorstep (Mon-Fri).</p>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;