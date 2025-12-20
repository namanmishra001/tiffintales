import React, { useEffect, useState, useRef } from 'react';
import { FEATURES, TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';
import { Quote, Star, MapPin } from 'lucide-react';

// REPLACE WITH YOUR ACTUAL PLACE ID
const GOOGLE_PLACE_ID = 'ChIJOcPWWobbhVQRWhU6EOTeBNU'; 

const WhyChooseUs: React.FC = () => {
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
        // If the API is not enabled or permission is denied, we catch it here.
        // This prevents the app from breaking and allows local reviews to show.
        const errorMessage = error?.message || error?.toString() || "";

        if (errorMessage.includes("PERMISSION_DENIED") || errorMessage.includes("not been used")) {
             console.warn("⚠️ Google Maps Notice: 'Places API (New)' is not enabled on this API Key. The website is correctly falling back to local reviews.");
             console.warn("To enable live reviews: Go to Google Cloud Console > APIs & Services > Enable 'Places API (New)' (specifically the 'New' version).");
        } else {
             // Only log actual unexpected errors
             console.error("Error executing Google Places API:", error);
        }
        // We purposely do NOT update state here, so it renders the default TESTIMONIALS
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
        <div id="how-it-works" className="bg-white rounded-3xl p-10 lg:p-16 shadow-lg mb-20 relative overflow-hidden">
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

        {/* Reviews Section - Horizontal Auto Scroll */}
        <div>
          <div className="text-center mb-10">
             <h3 className="text-2xl font-serif font-bold mb-2">What Our Happy Eaters Say</h3>
             <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
               {(isGoogleLoaded || reviews.some(r => r.source === 'google')) && (
                 <>
                  <span className="font-semibold">Rating 4.9+ on</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4" />
                 </>
               )}
             </div>
          </div>
          
          {/* Scroll Container */}
          <div 
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
          >
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 px-4 hide-scrollbar snap-x cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {reviews.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[300px] md:min-w-[380px] bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative flex flex-col snap-center select-none hover:shadow-md transition-shadow"
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
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-saffron-50 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-saffron-50 to-transparent pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;