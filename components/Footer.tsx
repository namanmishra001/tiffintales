import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Tiffin Tales</h3>
            <p className="text-gray-400 text-sm">Experience the essence of Indian Cuisine right at your doorstep in Metro Vancouver.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-saffron-500">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#plans" className="hover:text-white">Plans</a></li>
              <li><a href="#menu" className="hover:text-white">Menu</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-saffron-500">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Tiffin Tales. All rights reserved.</p>
          <p className="mt-2 text-xs">Images are for representation purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;