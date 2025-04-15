
import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroCard from './HeroCard';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center pt-28 pb-16 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <HeroContent />
          
          <div className="relative mx-auto lg:mx-0 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
            <HeroCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
