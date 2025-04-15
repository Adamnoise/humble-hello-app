import React from 'react';
import { ChevronRight, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from './StatsCard';

const HeroContent = () => {
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-sm animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
        <p className="text-xs font-medium text-blue-300">Tippelj mérkőzésekre és nyerj jutalmakat</p>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
        <span className="block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
          Emeld új szintre 
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">
          mérkőzés tippjeidet
        </span>
      </h1>
      
      <p className="text-xl text-gray-300 max-w-xl animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
        Csatlakozz ezrekhez, akik tippelési tudásukat tesztelik és versenyeznek, hogy a ranglista élére kerüljenek.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-slide-in-bottom" style={{animationDelay: '0.5s'}}>
        <Link 
          to="/matches"
          className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.5)] transition-all duration-300"
        >
          <span className="relative z-10">Kezdj el tippelni most</span>
          <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </Link>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 pt-8 animate-slide-in-bottom" style={{animationDelay: '0.7s'}}>
        <StatsCard
          icon={Users}
          title="Felhasználók"
          value="10K+"
          subtitle="Aktív tippelő"
        />
        <StatsCard
          icon={Award}
          title="Pontosság"
          value="87%"
          subtitle="Legjobb tippelő"
        />
        <StatsCard
          icon={TrendingUp}
          title="Mérkőzések"
          value="5K+"
          subtitle="Tipp naponta"
        />
      </div>
    </div>
  );
};

export default HeroContent;
