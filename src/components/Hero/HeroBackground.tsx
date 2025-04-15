
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Main gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-blue-950/20 to-black/95"></div>
      
      {/* Animated radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.15),transparent_45%)]"></div>
      
      {/* Animated dot pattern overlay with refined animation */}
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)',
             backgroundSize: '30px 30px',
             backgroundPosition: '0 0',
           }}>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/40 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated orbs with glassmorphism */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-3xl animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default HeroBackground;
