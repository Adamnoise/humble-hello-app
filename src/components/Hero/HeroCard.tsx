
import React from 'react';
import { Trophy, Award } from 'lucide-react';

const HeroCard = () => {
  return (
    <div className="relative h-[500px] w-[500px] max-w-full">
      {/* Glowing orb backdrop with blur effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/15 blur-3xl animate-pulse-subtle"></div>
      
      {/* Decorative rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 animate-float" style={{animationDuration: '15s'}}></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-blue-500/10 animate-float" style={{animationDuration: '20s', animationDelay: '0.5s'}}></div>
      
      {/* Content container with enhanced glass effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[380px] h-[420px] rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-[0_30px_80px_rgba(59,130,246,0.2)]">
          {/* Match card preview with refined UI */}
          <div className="h-full w-full p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
                <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
              </div>
              <div className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-400/10">21:00</div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col items-center">
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <img 
                    src="https://media.api-sports.io/football/teams/42.png" 
                    alt="Arsenal" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-white">Arsenal</span>
                <span className="text-xs text-blue-400 mt-1">Otthon</span>
              </div>
              
              <div className="flex flex-col items-center mx-4">
                <div className="text-lg font-bold mb-1 text-gray-400">VS</div>
                <div className="text-xs text-blue-400 py-1 px-3 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/10 animate-pulse-subtle">Élő</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <img 
                    src="https://media.api-sports.io/football/teams/49.png" 
                    alt="Chelsea" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-white">Chelsea</span>
                <span className="text-xs text-blue-400 mt-1">Vendég</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Tipp esélyek</div>
                <div className="flex gap-1 items-center">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '42%'}}></div>
                  </div>
                  <span className="text-xs text-blue-400 min-w-[30px] text-right">42%</span>
                </div>
                <div className="flex gap-1 items-center mt-1.5">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{width: '28%'}}></div>
                  </div>
                  <span className="text-xs text-gray-400 min-w-[30px] text-right">28%</span>
                </div>
                <div className="flex gap-1 items-center mt-1.5">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '30%'}}></div>
                  </div>
                  <span className="text-xs text-blue-400 min-w-[30px] text-right">30%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                  Hazai
                </button>
                <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                  Döntetlen
                </button>
                <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                  Vendég
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-[20%] right-[5%] w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.3)] animate-float" style={{animationDuration: '4s'}}>
        <Trophy className="text-white h-5 w-5" />
      </div>
      <div className="absolute bottom-[15%] left-[10%] w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(139,92,246,0.3)] animate-float" style={{animationDuration: '5s', animationDelay: '1s'}}>
        <Award className="text-white h-4 w-4" />
      </div>
    </div>
  );
};

export default HeroCard;
