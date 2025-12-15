import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-saffron-50">
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-saffron-200 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-veggreen-200 opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="mb-12 lg:mb-0 text-center lg:text-left fade-in-up">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-veggreen-100 text-veggreen-800 font-semibold text-sm tracking-wide">
              🌿 100% Pure Vegetarian Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
              Experience the <span className="text-saffron-600">Essence</span> of Indian Cuisine
            </h1>
            <p className="text-lg text-gray-600 mb-4 font-light">
              Healthy. Homely. Happiness. Fresh. Fit. Flavourful.
            </p>
            <p className="text-xl text-gray-800 mb-8 max-w-lg mx-auto lg:mx-0">
               Your daily tiffin, now with a <span className="font-bold text-saffron-600">free cool shake!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#plans" className="px-8 py-4 bg-saffron-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-saffron-700 transition-transform transform hover:-translate-y-1">
                View Plans
              </a>
              <a href="#menu" className="px-8 py-4 bg-white text-saffron-600 border-2 border-saffron-600 rounded-full font-bold text-lg hover:bg-saffron-50 transition-colors">
                Today's Menu
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
               <span className="flex items-center"><span className="w-2 h-2 bg-veggreen-600 rounded-full mr-2"></span>Free Delivery</span>
               <span className="flex items-center"><span className="w-2 h-2 bg-veggreen-600 rounded-full mr-2"></span>Fresh Daily</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:ml-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574&auto=format&fit=crop" 
                alt="Delicious North Indian Thali" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-duration-700"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-saffron-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Deluxe Promo</p>
                <p className="text-2xl font-bold text-saffron-600">$10<span className="text-sm text-gray-400 font-normal">/meal</span></p>
              </div>
            </div>
            
            {/* Background Blob decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-saffron-200 to-veggreen-200 rounded-full opacity-40 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;