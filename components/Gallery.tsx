import React from 'react';

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?q=80&w=800",
    alt: "Paneer Butter Masala",
    category: "Special",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800",
    alt: "Fresh Healthy Salad",
    category: "Healthy Bowls",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800",
    alt: "Street Food Specials",
    category: "Weekend Treat",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800",
    alt: "Flavory Biryani",
    category: "Daily Staple",
    className: "md:col-span-2 md:row-span-1"
  }
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 bg-saffron-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">A Visual Feast</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Every dish is prepared with love and fresh ingredients. Take a sneak peek at what goes into your Tiffin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 ${img.className}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {img.category}
                </span>
                <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <a href="https://www.instagram.com/tiffintales.ca" target="_blank" rel="noreferrer" className="inline-flex items-center text-saffron-600 font-bold hover:text-saffron-700 transition-colors">
                 Follow us on Instagram for daily updates &rarr;
             </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;