import React from 'react';
import { Sunrise, Coffee, Sparkles, Clock } from 'lucide-react';

const BreakfastTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-saffron-50 border-y border-saffron-100 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400 rounded-full blur-3xl opacity-10 -ml-20 -mb-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="order-2 md:order-1">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-saffron-200 text-saffron-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm animate-bounce">
                    <Sparkles size={14} className="text-saffron-500 fill-saffron-500" />
                    <span>Coming Soon</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                    Breakfast Delivered <br/>
                    <span className="text-saffron-600 relative inline-block">
                        at 7 AM
                       
                    </span>
                </h3>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-lg">
                    Start your morning with a wholesome, home-cooked Indian breakfast. 
                    We are bringing <strong>Poha, Upma, Varieties of Parathas, Mix Pakora, Chai</strong> straight to your doorstep before you start your day.
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white px-5 py-3 rounded-xl border border-saffron-100 shadow-sm transition-transform hover:scale-105">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-veggreen-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-veggreen-500"></span>
                        </span>
                        Pure Veg
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white px-5 py-3 rounded-xl border border-saffron-100 shadow-sm transition-transform hover:scale-105">
                        <Clock size={18} className="text-orange-500" /> 
                        7:00 AM to 9:00 AM
                    </div>
                </div>
            </div>
            
            {/* Visual / Icon Side */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
                <div className="relative group perspective-1000">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-saffron-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full duration-500"></div>
                    
                    {/* Card Image Representation */}
                    <div className="relative bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-all duration-500 ease-out hover:scale-105">
                        <div className="absolute -top-6 -right-6 bg-saffron-600 text-white p-4 rounded-full shadow-lg shadow-saffron-600/30 animate-pulse">
                            <Sunrise size={32} />
                        </div>
                        
                        <Coffee size={100} className="text-gray-800 mx-auto mb-6 drop-shadow-sm" strokeWidth={1} />
                        
                        <div className="text-center">
                            <p className="font-serif font-bold text-2xl text-gray-900">Morning Menu</p>
                            <div className="h-1.5 w-24 bg-gray-100 mx-auto my-4 rounded-full overflow-hidden">
                                <div className="h-full bg-saffron-500 w-2/3 animate-pulse"></div>
                            </div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-bold">Launching Soon</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default BreakfastTeaser;