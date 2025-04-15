
import React from 'react';
import { Team } from '../../data/premier-league-teams';
import PredictionResultCard from '../match/PredictionResultCard';

interface PredictionResultsSectionProps {
  selectedTeams: { home: Team | null; away: Team | null }[];
}

const PredictionResultsSection: React.FC<PredictionResultsSectionProps> = ({ selectedTeams }) => {
  return (
    <div className="mt-16 animate-fade-in" style={{animationDelay: "0.7s"}}>
      <h3 className="text-2xl font-bold text-white mb-6">Predikciók eredménye</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {selectedTeams
          .slice(0, 4)
          .map((match, index) => (
            <PredictionResultCard key={index} match={match} />
          ))}
      </div>
      
      {selectedTeams.length > 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {selectedTeams
            .slice(4)
            .map((match, index) => (
              <PredictionResultCard key={index + 4} match={match} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PredictionResultsSection;
