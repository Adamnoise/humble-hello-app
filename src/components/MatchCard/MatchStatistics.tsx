
import React from 'react';
import { ChevronDown, BarChart3, Activity, Shield } from 'lucide-react';
import { Team, HeadToHead } from '../../types/match';
import { cn } from '../../lib/utils';

interface MatchStatisticsProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
  headToHead: HeadToHead[];
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const MatchStatistics: React.FC<MatchStatisticsProps> = ({
  homeTeam,
  awayTeam,
  headToHead,
  isExpanded,
  toggleExpanded
}) => {
  if (!homeTeam || !awayTeam) return null;

  const renderStatBar = (homeValue: number, awayValue: number, label: string) => {
    const total = homeValue + awayValue;
    const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
    const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;

    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{homeValue}</span>
          <span>{label}</span>
          <span>{awayValue}</span>
        </div>
        <div className="flex h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500" 
            style={{ width: `${homePercent}%` }}
          />
          <div 
            className="bg-red-500" 
            style={{ width: `${awayPercent}%` }}
          />
        </div>
      </div>
    );
  };

  const renderHeadToHead = () => {
    if (!headToHead.length) return <p className="text-sm text-gray-400 text-center">Nincs korábbi mérkőzés</p>;

    const homeWins = headToHead.filter(match => 
      (match.homeTeam === homeTeam.name && match.winner === 'home') || 
      (match.awayTeam === homeTeam.name && match.winner === 'away')
    ).length;
    
    const awayWins = headToHead.filter(match => 
      (match.homeTeam === awayTeam.name && match.winner === 'home') || 
      (match.awayTeam === awayTeam.name && match.winner === 'away')
    ).length;
    
    const draws = headToHead.filter(match => match.winner === 'draw').length;

    return (
      <div className="space-y-4">
        <div className="flex justify-between bg-gray-800/50 rounded-lg p-3">
          <div className="text-center">
            <span className="text-2xl font-bold text-blue-400">{homeWins}</span>
            <p className="text-xs text-gray-400">Győzelem</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-300">{draws}</span>
            <p className="text-xs text-gray-400">Döntetlen</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold text-red-400">{awayWins}</span>
            <p className="text-xs text-gray-400">Győzelem</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-300">Korábbi mérkőzések:</p>
          {headToHead.map((match, index) => (
            <div key={index} className="bg-gray-800/30 rounded p-2 text-xs">
              <div className="flex justify-between items-center">
                <span className={match.winner === 'home' ? 'text-blue-400 font-medium' : 'text-gray-400'}>
                  {match.homeTeam}
                </span>
                <span className="mx-2 bg-gray-700/50 px-2 py-0.5 rounded">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className={match.winner === 'away' ? 'text-blue-400 font-medium' : 'text-gray-400'}>
                  {match.awayTeam}
                </span>
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                {new Date(match.date).toLocaleDateString('hu-HU', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4 bg-gray-900/60 border border-white/5 rounded-lg overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-gray-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <span>Statisztikák</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="px-4 py-3 space-y-4">
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Csapat statisztikák
            </h4>
            
            {homeTeam.stats && awayTeam.stats && (
              <div className="space-y-3">
                {renderStatBar(homeTeam.stats.wins, awayTeam.stats.wins, "Győzelmek")}
                {renderStatBar(homeTeam.stats.draws, awayTeam.stats.draws, "Döntetlenek")}
                {renderStatBar(homeTeam.stats.goalsFor, awayTeam.stats.goalsFor, "Lőtt gólok")}
                {renderStatBar(homeTeam.stats.played, awayTeam.stats.played, "Játszott meccsek")}
              </div>
            )}
          </div>
          
          <div>
            <h4 className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              Egymás elleni mérkőzések
            </h4>
            {renderHeadToHead()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchStatistics;
