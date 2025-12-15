import React, { useState, useEffect } from 'react';
import { PLANS, WEEKLY_MENU, HEALTHY_BOWLS, WEEKEND_SPECIALS } from '../constants';
import { Check, Calendar } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'weekly' | 'bowls'>('plans');

  // Handle Hash Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#plans') {
        setActiveTab('plans');
      } else if (hash === '#menu') {
        setActiveTab('weekly');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="menu" className="py-20 bg-white relative">
      {/* Hidden Scroll Anchor for Plans */}
      <div id="plans" className="absolute top-0 -mt-24 pointer-events-none opacity-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Menu & Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From comforting home-style curries to protein-packed salads, we have something for every palate.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
              activeTab === 'plans' 
                ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-500/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            SUBSCRIPTION PLANS
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
              activeTab === 'weekly' 
                ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-500/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            WEEKLY MENU
          </button>
          <button
            onClick={() => setActiveTab('bowls')}
            className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
              activeTab === 'bowls' 
                ? 'bg-saffron-600 text-white shadow-lg shadow-saffron-500/30' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            HEALTHY BOWLS & EXTRAS
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
            
          {/* PLANS TAB */}
          {activeTab === 'plans' && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-in-up">
              {PLANS.map((plan) => (
                <div key={plan.name} className={`relative rounded-2xl p-8 border-2 ${plan.isPopular ? 'border-saffron-500 bg-saffron-50' : 'border-gray-100 bg-white'} hover:shadow-xl transition-shadow`}>
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-saffron-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                      BEST VALUE
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-saffron-600">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wide">{plan.perMeal}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-veggreen-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className={`block w-full py-3 px-6 text-center rounded-xl font-bold transition-colors ${plan.isPopular ? 'bg-saffron-600 text-white hover:bg-saffron-700' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
                    Select Plan
                  </a>
                </div>
              ))}
              
              <div className="md:col-span-2 bg-veggreen-50 rounded-xl p-6 border border-veggreen-100 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-veggreen-800 mb-1">Promo Offer!</h4>
                  <p className="text-veggreen-700">Subscribe for 20 days and get <strong>1 Extra Day FREE!</strong> Refer a friend to get a Free Tiffin.</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-veggreen-600 text-white rounded-lg font-semibold hover:bg-veggreen-700">
                  Claim Offer
                </button>
              </div>
            </div>
          )}

          {/* WEEKLY MENU TAB */}
          {activeTab === 'weekly' && (
            <div className="fade-in-up">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WEEKLY_MENU.map((day) => (
                  <div key={day.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-orange-100 px-6 py-3 border-b border-orange-200 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">{day.day}</h3>
                      <Calendar size={16} className="text-orange-500"/>
                    </div>
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-saffron-600 uppercase tracking-wider mb-4">{day.title}</h4>
                      <ul className="space-y-2">
                        {day.items.map((item, idx) => (
                          <li key={idx} className="flex items-center text-gray-700 text-sm">
                            <span className="w-1.5 h-1.5 bg-veggreen-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-8 italic">* Menu is subject to seasonal changes to ensure freshness.</p>
            </div>
          )}

          {/* BOWLS & EXTRAS TAB */}
          {activeTab === 'bowls' && (
            <div className="fade-in-up">
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">🥗</span> Healthy Bowls & Salads
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {HEALTHY_BOWLS.map((bowl) => (
                    <div key={bowl.name} className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                        <img 
                          src={bowl.image} 
                          alt={bowl.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-gray-900">{bowl.name}</h4>
                            <span className="font-bold text-saffron-600">{bowl.price}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{bowl.description}</p>
                        </div>
                        <div className="flex gap-2">
                          {bowl.tags?.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-veggreen-50 text-veggreen-700 text-xs font-semibold rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">🍔</span> Weekend Specials (Pre-Order)
                </h3>
                <div className="flex flex-wrap gap-3">
                  {WEEKEND_SPECIALS.map((item) => (
                    <span key={item} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-saffron-400 hover:text-saffron-600 transition-colors cursor-default shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;