
import React from 'react';
import HeroBackground from './Hero/HeroBackground';
import HeroContent from './Hero/HeroContent';
import HeroCard from './Hero/HeroCard';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Advanced Background Effects */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content with Enhanced Typography and Microinteractions */}
          <HeroContent />
          
          {/* Hero Image with Advanced Glassmorphism and 3D Effects */}
          <div className="relative mx-auto lg:mx-0 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
            <HeroCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
