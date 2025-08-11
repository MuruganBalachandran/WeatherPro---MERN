import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const FlipCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-primary overflow-auto">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Floating Gradient Orbs - Static positioning */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-xl"></div>
      
      {/* Weather Effects - Static positioning */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full opacity-80" />
      <div className="absolute top-[15%] right-[20%] w-24 h-12 bg-white/80 rounded-full opacity-90" />
      <div className="absolute top-[40%] right-[10%] w-20 h-10 bg-white/70 rounded-full opacity-80" />

      {/* Scrollable Container */}
      <div className="min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-4xl relative z-10">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
              {/* Login Side (Front) */}
              <div className="flip-card-front">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                    {/* Left Side - Login Form */}
                    <div className="flex items-center justify-center p-6">
                      <div className="w-full max-w-sm">
                        <LoginForm onFlip={flipCard} />
                      </div>
                    </div>

                    {/* Right Side - Weather Content */}
                    <div className="hidden lg:flex items-center justify-center p-6 bg-gradient-primary text-white relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                      </div>
                      
                      <div className="text-center relative z-10 max-w-sm">
                        <div className="mb-4">
                          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                            <img
                              src="https://openweathermap.org/img/wn/01d@4x.png"
                              alt="Weather"
                              className="w-10 h-10"
                            />
                          </div>
                          <h2 className="text-lg font-bold mb-2">Welcome to WeatherPro</h2>
                          <p className="text-blue-100 mb-3 leading-relaxed text-xs">
                            Your personal weather companion providing accurate, real-time weather data 
                            with beautiful visualizations.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="text-sm font-bold mb-1">100K+</div>
                            <div className="text-blue-200 text-xs">Cities</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="text-sm font-bold mb-1">99.9%</div>
                            <div className="text-blue-200 text-xs">Accuracy</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="text-sm font-bold mb-1">24/7</div>
                            <div className="text-blue-200 text-xs">Updates</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="text-sm font-bold mb-1">50K+</div>
                            <div className="text-blue-200 text-xs">Users</div>
                          </div>
                        </div>

                        <div className="text-blue-100 text-xs space-y-1">
                          <p>✨ Real-time updates</p>
                          <p>🌍 Global coverage</p>
                          <p>📱 Beautiful interface</p>
                          <p>🔒 Secure & private</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signup Side (Back) */}
              <div className="flip-card-back">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                    {/* Left Side - Weather Content */}
                    <div className="hidden lg:flex items-center justify-center p-6 bg-gradient-primary text-white relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                      </div>
                      
                      <div className="text-center relative z-10 max-w-sm">
                        <div className="mb-4">
                          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                            <img
                              src="https://openweathermap.org/img/wn/02d@4x.png"
                              alt="Weather"
                              className="w-10 h-10"
                            />
                          </div>
                          <h2 className="text-lg font-bold mb-2">Join WeatherPro</h2>
                          <p className="text-blue-100 mb-3 leading-relaxed text-xs">
                            Start your journey with the most trusted weather platform. 
                            Get personalized forecasts today.
                          </p>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 text-left">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <span className="font-semibold text-xs">Personalized Dashboard</span>
                            </div>
                            <p className="text-blue-200 text-xs ml-6">Track favorite cities</p>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 text-left">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <span className="font-semibold text-xs">Weather Alerts</span>
                            </div>
                            <p className="text-blue-200 text-xs ml-6">Severe weather notifications</p>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 text-left">
                            <div className="flex items-center mb-1">
                              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <span className="font-semibold text-xs">Advanced Analytics</span>
                            </div>
                            <p className="text-blue-200 text-xs ml-6">Detailed weather data</p>
                          </div>
                        </div>

                        <div className="text-blue-100 text-xs">
                          <p>Join thousands who trust WeatherPro daily</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Signup Form */}
                    <div className="flex items-center justify-center p-6">
                      <div className="w-full max-w-sm">
                        <SignupForm onFlip={flipCard} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;