
import React from 'react';
import { Badge } from "@/components/ui/badge";
import LiveMatchCard from "@/components/LiveMatchCard";
import { Team } from '@/types/match';

interface LiveMatchSectionProps {
  liveMatches: Array<{
    id: number;
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
    status: string;
    homeScore?: number;
    awayScore?: number;
  }>;
  findTeamByName: (name: string) => Team;
  onMatchClick: (match: any) => void;
}

const LiveMatchSection: React.FC<LiveMatchSectionProps> = ({ 
  liveMatches, 
  findTeamByName, 
  onMatchClick 
}) => {
  if (liveMatches.length === 0) return null;
  
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center gap-2">
        <Badge className="bg-red-500">LIVE</Badge>
        <h3 className="text-white font-medium">Live Matches</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveMatches.map((match) => (
          <LiveMatchCard 
            key={match.id}
            id={match.id}
            homeTeam={findTeamByName(match.homeTeam)}
            awayTeam={findTeamByName(match.awayTeam)}
            startTime={match.time}
            onMatchClick={() => onMatchClick(match)}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveMatchSection;
