import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-saffron-50/90 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex flex-col items-center justify-center bg-white rounded-full h-12 w-12 border-2 border-saffron-600 mr-2 shadow-sm">
                 <span className="text-xl">👩‍🍳</span>
            </div>
            <div>
                <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Tiffin Tales</h1>
                <p className="text-[10px] uppercase tracking-widest text-saffron-600 font-bold">Pure Veg</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-saffron-600 font-medium transition-colors text-sm uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a href="tel:+16046187770" className="flex items-center gap-2 bg-saffron-600 text-white px-5 py-2 rounded-full hover:bg-saffron-700 transition-colors shadow-lg shadow-saffron-500/30">
              <Phone size={16} />
              <span>Order Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-700 hover:text-saffron-600 focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-saffron-50/50">
             <div className="flex items-center">
                <div className="flex flex-col items-center justify-center bg-white rounded-full h-10 w-10 border-2 border-saffron-600 mr-3 shadow-sm">
                   <span className="text-xl">👩‍🍳</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold text-gray-900 leading-none">Tiffin Tales</span>
                    <span className="text-[10px] font-bold text-saffron-600 tracking-widest uppercase mt-0.5">Pure Veg</span>
                </div>
             </div>
             <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
             >
                <X size={28} />
             </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
             {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-gray-700 hover:text-saffron-600 transition-colors py-2 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </a>
             ))}
             
             <div className="pt-4">
               <a 
                  href="tel:+16046187770" 
                  className="block w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-saffron-200 text-center transition-colors"
               >
                  Call to Order
               </a>
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-saffron-50 flex justify-center gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-veggreen-400 rounded-full"></span>
                Free Delivery
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-veggreen-400 rounded-full"></span>
                Fresh Daily
              </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;