import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, TrendingUp } from 'lucide-react';

const WeatherEffects: React.FC = () => {
  const renderRainDrops = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="rain-drop animate-rain"
        style={{
          left: `${68 + Math.random() * 12}%`, // Rain from the main cloud area
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`,
        }}
      />
    ));
  };

  const renderSnowFlakes = () => {
    return Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className="snow-flake animate-snow"
        style={{
          left: `${75 + Math.random() * 20}%`, // Snow in a specific area (right side)
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      >
        ❄
      </div>
    ));
  };

  return (
    <div className="weather-effects">
      {/* Sun Effect - Top right */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-400 rounded-full opacity-80 animate-pulse-glow" />
      
      {/* Main Rain Cloud - positioned to show rain effect */}
      <div className="cloud cloud-1 animate-float" style={{ top: '15%', right: '20%' }} />
      
      {/* Additional decorative clouds */}
      <div className="cloud cloud-2 animate-float-delayed" style={{ top: '40%', right: '10%' }} />
      <div className="cloud cloud-3 animate-float" style={{ top: '60%', right: '25%' }} />
      
      {/* Rain Effects - Coming from the main cloud */}
      {renderRainDrops()}
      
      {/* Snow Effects - Limited area on right side */}
      {renderSnowFlakes()}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-primary text-white overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Weather Effects */}
      <WeatherEffects />

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-xl animate-float-delayed"></div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-left animate-slide-in-left max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-6">
                {/* Static badge - no moving animation */}
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Zap className="h-4 w-4 mr-2 text-yellow-300" />
                  <span className="text-sm font-medium">Real-time Weather Intelligence</span>
                </div>
                
                {/* Static heading - no wave animation */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  Your Personal
                  <span className="block text-white drop-shadow-lg">
                    Weather Companion
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl leading-relaxed">
                  Experience weather like never before with stunning visualizations, 
                  AI-powered insights, and real-time data from around the globe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span>Explore Weather</span>
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                  <MapPin className="mr-3 h-5 w-5" />
                  Use My Location
                </button>
              </div>

              {/* Enhanced Stats - Left Aligned */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20 max-w-2xl">
                <div className="text-left group">
                  <div className="text-2xl lg:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform">100K+</div>
                  <div className="text-blue-200 text-sm">Cities Tracked</div>
                </div>
                <div className="text-left group">
                  <div className="text-2xl lg:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform">99.9%</div>
                  <div className="text-blue-200 text-sm">Accuracy</div>
                </div>
                <div className="text-left group">
                  <div className="text-2xl lg:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-blue-200 text-sm">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;