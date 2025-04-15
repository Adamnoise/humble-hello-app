
import React from 'react';
import MatchCard from '../match/MatchCard';
import { Team } from '../../data/premier-league-teams';

interface MatchCardGridProps {
  selectedTeams: { home: Team | null; away: Team | null }[];
  availableTeams: Team[];
  onTeamSelect: (matchIndex: number, side: 'home' | 'away', teamId: string) => void;
}

const MatchCardGrid: React.FC<MatchCardGridProps> = ({ selectedTeams, availableTeams, onTeamSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {selectedTeams.map((match, index) => (
        <MatchCard
          key={index}
          index={index}
          match={match}
          availableTeams={[
            ...(match.home ? [match.home] : []),
            ...(match.away ? [match.away] : []),
            ...availableTeams
          ]}
          onTeamSelect={onTeamSelect}
        />
      ))}
    </div>
  );
};

export default MatchCardGrid;
