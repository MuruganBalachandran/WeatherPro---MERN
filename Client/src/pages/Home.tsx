import React from 'react';
import Hero from '../components/home/Hero';
import WeatherDashboard from '../components/home/WeatherDashboard';
import Features from '../components/home/Features';
import FAQ from '../components/home/FAQ';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <WeatherDashboard />
      <Features />
      <FAQ />
    </div>
  );
};

export default Home;