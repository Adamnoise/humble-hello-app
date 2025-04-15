
import React from 'react';
import { Team } from '../../../data/premier-league-teams';

interface TeamsDisplayProps {
  homeTeam: Team;
  awayTeam: Team;
}

const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ homeTeam, awayTeam }) => {
  return (
    <div className="flex items-center justify-between mt-4 mb-6">
      <div className="flex flex-col items-center">
        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <img 
            src={homeTeam.logoUrl} 
            alt={homeTeam.name} 
            className="w-12 h-12 object-contain"
          />
        </div>
        <span className="text-sm font-medium text-white">{homeTeam.name}</span>
        <span className="text-xs text-blue-400 mt-1">Hazai</span>
      </div>
      
      <div className="flex flex-col items-center mx-4">
        <div className="text-lg font-bold mb-1 text-gray-400">VS</div>
        <div className="text-xs text-blue-400 py-1 px-3 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/10 animate-pulse-subtle">Élő</div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <img 
            src={awayTeam.logoUrl} 
            alt={awayTeam.name} 
            className="w-12 h-12 object-contain"
          />
        </div>
        <span className="text-sm font-medium text-white">{awayTeam.name}</span>
        <span className="text-xs text-blue-400 mt-1">Vendég</span>
      </div>
    </div>
  );
};

export default TeamsDisplay;
