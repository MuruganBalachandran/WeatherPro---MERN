import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Github, Mail, Heart, MapPin, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white relative overflow-hidden border-t border-gray-200 dark:border-gray-700">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Enhanced Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Cloud className="h-10 w-10 text-primary-600 group-hover:text-primary-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-primary-600/20 rounded-full blur-lg group-hover:bg-primary-600/40 transition-all duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">WeatherPro</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Your personal weather companion providing accurate, real-time weather data 
              with beautiful visualizations and intelligent insights for better decision making.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-200 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-primary transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@weatherpro.com"
                className="p-3 bg-gray-200 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-primary transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-200 dark:bg-gray-700 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-primary transition-all duration-300 transform hover:scale-110"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center text-gray-900 dark:text-white">
              <Zap className="h-5 w-5 mr-2 text-primary-600" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Search Cities
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center text-gray-900 dark:text-white">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 inline-block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 WeatherPro. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-4 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-2 text-red-500 animate-pulse" /> for weather enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;