
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Team } from '../../data/premier-league-teams';

interface MatchCardProps {
  index: number;
  match: { home: Team | null; away: Team | null };
  availableTeams: Team[];
  onTeamSelect: (matchIndex: number, side: 'home' | 'away', teamId: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ index, match, availableTeams, onTeamSelect }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5 animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
      {/* Home Team Select */}
      <div className="mb-3">
        <Select 
          value={match.home?.id || ""} 
          onValueChange={(value) => onTeamSelect(index, 'home', value)}
        >
          <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
            <SelectValue placeholder="Válassz hazai csapatot" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
            {availableTeams
              .filter(team => team.id !== match.away?.id)
              .map(team => (
                <SelectItem key={team.id} value={team.id}>
                  <div className="flex items-center gap-2">
                    {team.logoUrl && (
                      <img 
                        src={team.logoUrl} 
                        alt={`${team.name} logo`} 
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span>{team.name}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Away Team Select */}
      <div className="mb-3">
        <Select 
          value={match.away?.id || ""} 
          onValueChange={(value) => onTeamSelect(index, 'away', value)}
        >
          <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
            <SelectValue placeholder="Válassz vendég csapatot" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
            {availableTeams
              .filter(team => team.id !== match.home?.id)
              .map(team => (
                <SelectItem key={team.id} value={team.id}>
                  <div className="flex items-center gap-2">
                    {team.logoUrl && (
                      <img 
                        src={team.logoUrl} 
                        alt={`${team.name} logo`} 
                        className="w-6 h-6 object-contain"
                      />
                    )}
                    <span>{team.name}</span>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Team logos preview */}
      {match.home && match.away && (
        <div className="flex items-center justify-center gap-4 mt-4 mb-2">
          <div className="flex flex-col items-center">
            <img 
              src={match.home.logoUrl} 
              alt={`${match.home.name} logo`} 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xs text-gray-300 mt-1 text-center">{match.home.name}</span>
          </div>
          <span className="text-gray-400 font-bold">VS</span>
          <div className="flex flex-col items-center">
            <img 
              src={match.away.logoUrl} 
              alt={`${match.away.name} logo`} 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xs text-gray-300 mt-1 text-center">{match.away.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
