
import React from 'react';
import { Team } from '../../data/premier-league-teams';
import PredictionHeader from './PredictionHeader';
import TeamsDisplay from './prediction-card/TeamsDisplay';
import PredictionStats from './prediction-card/PredictionStats';
import PredictionButtons from './prediction-card/PredictionButtons';

interface PredictionResultCardProps {
  match: { 
    home: Team | null; 
    away: Team | null;
    status?: 'upcoming' | 'live' | 'completed';
    time?: string;
  };
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ match }) => {
  if (!match.home || !match.away) return null;
  
  const isLive = match.status === 'live';
  
  return (
    <div className="max-w-[500px] mx-auto my-6">
      <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="h-full w-full p-8 flex flex-col">
          {/* Header */}
          <PredictionHeader isLive={isLive} matchTime={match.time || "21:00"} />
          
          {/* Teams */}
          <TeamsDisplay homeTeam={match.home} awayTeam={match.away} />
          
          {/* Prediction Stats */}
          <PredictionStats match={{ home: match.home, away: match.away }} />
          
          {/* Prediction Buttons */}
          <PredictionButtons />
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;
