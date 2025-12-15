import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const message = `*New Tiffin Enquiry from Website*
    
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Message:* ${formData.message || 'No message provided'}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp API Link (using the number from the contact info: 1-604-618-7770)
    const whatsappUrl = `https://wa.me/16046187770?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Start Your Healthy Journey</h2>
            <p className="text-gray-600 text-lg mb-10">
              Ready to subscribe or have a special request? We deliver from 10 AM to 10 PM. Reach out to us today!
            </p>

            <div className="space-y-6">
              
              {/* Phone - Clickable */}
              <a 
                href="tel:+16046187770"
                className="flex items-start p-4 -ml-4 rounded-xl hover:bg-saffron-50 transition-all duration-300 group cursor-pointer active:scale-95"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center text-saffron-600 group-hover:scale-110 group-hover:bg-saffron-200 transition-all duration-300 shadow-sm">
                  <Phone size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-saffron-700 transition-colors">Phone</h3>
                  <p className="text-gray-600 group-hover:text-gray-900">+1-604-618-7770</p>
                  <p className="text-sm text-gray-400">Available on WhatsApp</p>
                </div>
              </a>

              {/* Email - Clickable */}
              <a 
                href="mailto:tiffintales.ca@gmail.com"
                className="flex items-start p-4 -ml-4 rounded-xl hover:bg-saffron-50 transition-all duration-300 group cursor-pointer active:scale-95"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center text-saffron-600 group-hover:scale-110 group-hover:bg-saffron-200 transition-all duration-300 shadow-sm">
                  <Mail size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-saffron-700 transition-colors">Email</h3>
                  <p className="text-gray-600 group-hover:text-gray-900">tiffintales.ca@gmail.com</p>
                </div>
              </a>

              {/* Location - Clickable */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=155+St,+Surrey+BC,+V3S+3P3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start p-4 -ml-4 rounded-xl hover:bg-saffron-50 transition-all duration-300 group cursor-pointer active:scale-95"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center text-saffron-600 group-hover:scale-110 group-hover:bg-saffron-200 transition-all duration-300 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-saffron-700 transition-colors">Service Area</h3>
                  <p className="text-gray-600 group-hover:text-gray-900">Fleetwood, Surrey, BC</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-500">155 St, Surrey BC, V3S 3P3</p>
                </div>
              </a>

            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all outline-none"
                  placeholder="The Cool Dude"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all outline-none"
                  placeholder="(604) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message / Plan Interest</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all outline-none"
                  placeholder="I'm interested in the Deluxe Plan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-saffron-600 text-white font-bold py-4 rounded-lg hover:bg-saffron-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-saffron-500/20 active:scale-95 transform duration-150"
              >
                Send Message via WhatsApp <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;