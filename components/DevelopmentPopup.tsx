import React, { useState, useEffect } from 'react';
import { Construction, X } from 'lucide-react';

const DevelopmentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Fade in after a brief delay on mount
    const showTimer = setTimeout(() => setIsVisible(true), 1000);

    // Fade out after 5 seconds of visibility
    const hideTimer = setTimeout(() => setIsVisible(false), 8500);

    // Unmount completely after the fade-out transition (500ms) finishes
    const removeTimer = setTimeout(() => setShouldRender(false), 11000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-sm border-l-4 border-saffron-500 p-4 rounded-lg shadow-2xl max-w-xs md:max-w-sm flex items-start gap-4 ring-1 ring-black/5">
            <div className="bg-saffron-100 p-2 rounded-full text-saffron-600 flex-shrink-0 animate-pulse">
                <Construction size={20} />
            </div>
            <div className="flex-1 pt-0.5">
                <h4 className="text-sm font-bold text-gray-900">Work in Progress</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Our digital kitchen is still cooking! You might see some changes as we fine-tune the website.
                </p>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors -mt-1 -mr-1 p-1"
                aria-label="Close"
            >
                <X size={16} />
            </button>
        </div>
    </div>
  );
};

export default DevelopmentPopup;