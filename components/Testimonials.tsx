import React, { useEffect, useState, useRef } from 'react';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';
import { Quote, Star, MapPin } from 'lucide-react';

// REPLACE WITH YOUR ACTUAL PLACE ID
const GOOGLE_PLACE_ID = 'ChIJOcPWWobbhVQRWhU6EOTeBNU'; 

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Fetch Google Reviews (Using New Places API)
  useEffect(() => {
    let isMounted = true;
    
    const fetchReviews = async () => {
      // 1. Check if Google Maps script base is loaded
      if (!(window as any).google || !(window as any).google.maps) {
        return; 
      }

      try {
        // 2. Use importLibrary to load the modern Places library
        const { Place } = await (window as any).google.maps.importLibrary("places");

        if (!Place) return;

        const place = new Place({
          id: GOOGLE_PLACE_ID,
        });

        // 3. Fetch fields using the New Places API method
        await place.fetchFields({ 
            fields: ['reviews', 'rating'] 
        });

        if (!isMounted) return;

        // 4. Access data directly from the place instance properties
        const reviewsData = place.reviews;

        if (reviewsData && reviewsData.length > 0) {
            console.log("✅ Google Reviews Fetched Successfully (New API)");
            
            const googleReviews: Testimonial[] = reviewsData.map((r: any) => ({
              // Map New API response structure to our Testimonial type
              name: r.authorAttribution?.displayName || 'Google User',
              location: r.relativePublishTimeDescription || 'Google Review',
              text: r.text || '', // New API text field
              rating: r.rating || 5,
              image: r.authorAttribution?.photoUri || '',
              source: 'google',
              date: r.publishTime ? new Date(r.publishTime).toLocaleDateString() : ''
            }));
            
            // MERGE: Google Reviews FIRST, then Local Testimonials
            setReviews([...googleReviews, ...TESTIMONIALS]);
            setIsGoogleLoaded(true);
        }

      } catch (error: any) {
        // ROBUST ERROR HANDLING
        const errorMessage = error?.message || error?.toString() || "";

        if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("not been used")) {
             console.warn("⚠️ Google Maps Notice: 'Places API (New)' is not enabled on this API Key. The website is correctly falling back to local reviews.");
        } else {
             // Only log actual unexpected errors
             console.error("Error executing Google Places API:", error);
        }
      }
    };

    // 3. Poll for the script to load
    const interval = setInterval(() => {
      if ((window as any).google && (window as any).google.maps) {
        clearInterval(interval);
        fetchReviews();
      }
    }, 500);

    // Stop polling after 10 seconds to save resources if script never loads
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // 2. Horizontal Auto Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    // Track exact float position for smoothness
    let scrollPos = scrollContainer.scrollLeft;
    
    // Speed of auto-scroll (pixels per frame)
    const speed = 0.5; 

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        // Detection: If user manually scrolled, update our internal tracker so we don't jump back
        if (Math.abs(scrollContainer.scrollLeft - scrollPos) > 5) {
             scrollPos = scrollContainer.scrollLeft;
        }

        scrollPos += speed;
        
        // Infinite Loop Logic:
        // If we scrolled to the end, reset to 0
        if (scrollPos >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
           scrollPos = 0;
           scrollContainer.scrollLeft = 0;
        } else {
           scrollContainer.scrollLeft = scrollPos;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, reviews]);

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-center mb-10">
             <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">What Our Happy Eaters Say</h3>
             <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
               {(isGoogleLoaded || reviews.some(r => r.source === 'google')) && (
                 <>
                  <span className="font-semibold">Rating 4.9+ on</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4" />
                 </>
               )}
             </div>
          </div>
          
          {/* Scroll Container - Removed snap-x to fix shaking */}
          <div 
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 px-4 hide-scrollbar cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {reviews.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[300px] md:min-w-[380px] bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative flex flex-col select-none hover:shadow-md transition-shadow"
                  >
                    <Quote className="absolute top-4 right-4 text-saffron-100 w-8 h-8" />
                    
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.round(t.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} 
                        />
                      ))}
                    </div>
                    
                    {/* Text */}
                    <div className="flex-grow mb-6">
                        <p className="text-gray-600 italic text-sm line-clamp-4 leading-relaxed">"{t.text}"</p>
                    </div>
                    
                    {/* Author Info */}
                    <div className="flex items-center pt-4 border-t border-gray-50">
                      {t.image ? (
                        <img 
                            src={t.image} 
                            alt={t.name} 
                            className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200" 
                            referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center text-sm font-bold text-gray-500">
                            {t.name.charAt(0)}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-gray-900 truncate">{t.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                             <p className="text-xs text-gray-400 flex items-center gap-1">
                                {t.source === 'google' ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-3 h-3" />
                                ) : (
                                    <MapPin size={10} />
                                )}
                                {t.location}
                            </p>
                            {t.date && <span className="text-[10px] text-gray-300">{t.date}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            {/* Gradient Fade effect on sides */}
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;