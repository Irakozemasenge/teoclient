import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">y-Tech Hub</h3>
            <p className="text-gray-400">Innovation et Technologie à Bubanza</p>
          </div>
          
          <div className="flex space-x-6 mb-8 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Youth Technology Hub. Tous droits réservés.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Fait avec <Heart size={16} className="text-red-500 fill-current" /> à Bubanza
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
