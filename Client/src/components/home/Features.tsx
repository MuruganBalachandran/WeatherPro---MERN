import React from 'react';
import { Search, Heart, Moon, Globe, Bell, BarChart3 } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Real-Time Data',
      description: 'Get accurate weather information from thousands of weather stations worldwide.',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    },
    {
      icon: Heart,
      title: 'Saved Cities',
      description: 'Keep track of weather in your favorite locations with our smart favorites system.',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Comfortable viewing experience with beautiful dark and light themes.',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Quickly find weather information for any city around the world.',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    },
    {
      icon: Bell,
      title: 'Weather Alerts',
      description: 'Stay informed with important weather alerts and notifications.',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive weather data including humidity, wind speed, and pressure.',
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            WeatherPro provides comprehensive weather information with an intuitive, 
            beautiful interface designed for everyday use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group card p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in stagger-${index + 1}`}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;