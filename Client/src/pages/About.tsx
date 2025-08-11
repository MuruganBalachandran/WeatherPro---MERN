import React from 'react';
import { Cloud, Users, Target, Award, Github, Mail, Shield, Zap, Heart, TrendingUp, Globe, Star } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users', color: 'text-primary-500' },
    { icon: Cloud, value: '100K+', label: 'Cities Tracked', color: 'text-secondary-500' },
    { icon: Target, value: '99.9%', label: 'Uptime', color: 'text-accent-500' },
    { icon: Award, value: '4.9/5', label: 'User Rating', color: 'text-yellow-500' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize data accuracy and reliability above all else, ensuring you can trust our forecasts.',
      color: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600',
    },
    {
      icon: Users,
      title: 'User-Centered',
      description: 'Every feature and design decision is made with our users\' needs and experience in mind.',
      color: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-600',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our product, from design to performance to support.',
      color: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data privacy and security are paramount. We never share your personal information.',
      color: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-600',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest weather technology and features.',
      color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-600',
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'We build for our community of weather enthusiasts who rely on accurate forecasts daily.',
      color: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-shimmer">
            <Globe className="h-4 w-4 mr-2 text-blue-300" />
            <span className="text-sm font-medium">Trusted by weather enthusiasts worldwide</span>
          </div>
          
          <Cloud className="h-20 w-20 mx-auto mb-8 animate-bounce-gentle" />
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">About WeatherPro</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto animate-fade-in-delayed leading-relaxed">
            We're on a mission to provide the most accurate, beautiful, and user-friendly 
            weather experience for everyone, everywhere. Join millions who trust WeatherPro 
            for their daily weather insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-primary/10 rounded-full border border-primary-200 dark:border-primary-800 mb-6">
                <TrendingUp className="h-4 w-4 mr-2 text-primary-600" />
                <span className="text-sm font-medium text-primary-600">Our Mission</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Revolutionizing Weather Intelligence
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                WeatherPro was born from the frustration of dealing with cluttered, 
                inaccurate weather apps. We believe that weather information should be 
                beautiful, reliable, and accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Our team combines cutting-edge technology with thoughtful design to 
                deliver weather data that you can trust, presented in a way that's 
                both informative and delightful to use.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                From real-time weather updates to personalized forecasts, we're committed 
                to helping you make informed decisions about your day, every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Github className="h-5 w-5" />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="mailto:support@weatherpro.com"
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                  alt="Weather monitoring"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-secondary rounded-full opacity-30 animate-bounce-gentle"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              WeatherPro by the Numbers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in-delayed">
              Trusted by millions worldwide for accurate weather insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center group animate-scale-in stagger-${index + 1}`}>
                <div className="card p-8 hover-lift">
                  <div className={`w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-8 w-8 text-white`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3 animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-primary/10 rounded-full border border-primary-200 dark:border-primary-800 mb-6">
              <Star className="h-4 w-4 mr-2 text-primary-600" />
              <span className="text-sm font-medium text-primary-600">Our Values</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything we do at WeatherPro is driven by these core values that shape 
              our product, culture, and commitment to our users.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`card p-8 text-center group hover-lift animate-scale-in stagger-${index + 1}`}>
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              WeatherPro leverages cutting-edge technology and reliable data sources to deliver 
              the most accurate weather information possible, wrapped in a beautiful user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-10 hover-lift animate-slide-in-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Real-Time Data Processing
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Our systems process weather data from thousands of meteorological stations 
                worldwide, updating every 15 minutes to ensure you have the latest information.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Global weather station network
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Satellite imagery integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Advanced forecasting algorithms
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Real-time data validation
                </li>
              </ul>
            </div>
            
            <div className="card p-10 hover-lift animate-slide-in-right">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  User Experience Focus
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Every aspect of WeatherPro is designed with user experience in mind, 
                from intuitive navigation to beautiful visualizations.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Responsive design for all devices
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Dark/light theme support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Accessibility compliance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Fast loading times
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;