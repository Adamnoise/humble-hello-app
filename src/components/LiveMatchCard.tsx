
import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Target } from 'lucide-react';
import { toast } from 'sonner';
import { Team } from '../types/match';

interface LiveMatchProps {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string;
  onMatchClick: () => void;
}

const LiveMatchCard: React.FC<LiveMatchProps> = ({
  id,
  homeTeam,
  awayTeam,
  startTime,
  onMatchClick
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isHalfTime, setIsHalfTime] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  
  // Simulate match progression
  useEffect(() => {
    if (matchEnded) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        // Half time check
        if (prev === 45) {
          setIsHalfTime(true);
          return prev;
        }
        
        // End match check
        if (prev === 90) {
          setMatchEnded(true);
          toast.success("Match has ended!", {
            description: `Final score: ${homeTeam.name} ${homeScore} - ${awayScore} ${awayTeam.name}`
          });
          return prev;
        }
        
        // Continue match
        if (!isHalfTime) {
          return prev + 1;
        }
        
        return prev;
      });
      
      // Randomly score goals (simplified simulation)
      const randomEvent = Math.random();
      
      // Goal probability increases as the match progresses
      const goalProbability = 0.005 + (elapsedTime * 0.0001);
      
      if (randomEvent < goalProbability && !isHalfTime) {
        const isHomeTeam = Math.random() > 0.5;
        
        if (isHomeTeam) {
          setHomeScore(prev => prev + 1);
          toast.success(`GOAL! ${homeTeam.name} scores!`, {
            description: `${homeTeam.name} ${homeScore + 1} - ${awayScore} ${awayTeam.name}`,
            icon: <Target className="h-4 w-4" />
          });
        } else {
          setAwayScore(prev => prev + 1);
          toast.success(`GOAL! ${awayTeam.name} scores!`, {
            description: `${homeTeam.name} ${homeScore} - ${awayScore + 1} ${awayTeam.name}`,
            icon: <Target className="h-4 w-4" />
          });
        }
      }
      
      // End half time after 5 seconds
      if (isHalfTime) {
        setTimeout(() => {
          setIsHalfTime(false);
          setElapsedTime(46);
        }, 5000);
      }
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [elapsedTime, homeScore, awayScore, isHalfTime, matchEnded, homeTeam.name, awayTeam.name]);
  
  const getTimeDisplay = () => {
    if (isHalfTime) return "HT";
    if (matchEnded) return "FT";
    if (elapsedTime > 45 && elapsedTime < 90) return `45+${elapsedTime - 45}'`;
    return `${elapsedTime}'`;
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 border border-white/5 hover:border-white/10 cursor-pointer"
      onClick={onMatchClick}
    >
      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>LIVE</span>
      </div>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-400">{startTime}</div>
        <div className="text-xs text-red-400 font-semibold animate-pulse flex items-center justify-center gap-1 mt-1">
          <span className="inline-block h-2 w-2 bg-red-500 rounded-full"></span>
          {getTimeDisplay()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <span className="text-xs font-bold">{homeTeam.name.substring(0, 2)}</span>
          </div>
          <span className="text-sm font-medium line-clamp-1">{homeTeam.name}</span>
        </div>
        
        {/* Score */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">
            {homeScore} - {awayScore}
          </div>
          {isHalfTime && (
            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full mt-1">Half Time</span>
          )}
          {matchEnded && (
            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full mt-1">Full Time</span>
          )}
        </div>
        
        {/* Away Team */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <span className="text-xs font-bold">{awayTeam.name.substring(0, 2)}</span>
          </div>
          <span className="text-sm font-medium line-clamp-1">{awayTeam.name}</span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-400">Click for match details</span>
      </div>
    </div>
  );
};

export default LiveMatchCard;
