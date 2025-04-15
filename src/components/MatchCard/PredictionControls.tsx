
import React from 'react';
import { Check } from 'lucide-react';
import { Team, PredictionType } from '../../types/match';

interface PredictionControlsProps {
  selectedPrediction: 'home' | 'draw' | 'away' | null;
  setSelectedPrediction: (prediction: 'home' | 'draw' | 'away') => void;
  homeTeam?: Team | null;
  awayTeam?: Team | null;
  minimal?: boolean;
}

const PredictionControls: React.FC<PredictionControlsProps> = ({
  selectedPrediction,
  setSelectedPrediction,
  homeTeam,
  awayTeam,
  minimal = false
}) => {
  if (minimal) {
    // Minimal UI for the small pills in the middle of the card
    return (
      <div className="flex gap-1.5 mt-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <button 
          onClick={() => setSelectedPrediction('home')}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'home' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
          aria-label="Predict home win"
        />
        <button 
          onClick={() => setSelectedPrediction('draw')}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'draw' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
          aria-label="Predict draw"
        />
        <button 
          onClick={() => setSelectedPrediction('away')}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'away' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
          aria-label="Predict away win"
        />
      </div>
    );
  }
  
  // Full UI with team names
  if (!homeTeam || !awayTeam) return null;
  
  return (
    <div className="grid grid-cols-3 gap-2 mt-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <button
        onClick={() => setSelectedPrediction('home')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
          selectedPrediction === 'home'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
        } touch-feedback`}
      >
        {selectedPrediction === 'home' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
        {homeTeam.name} Win
      </button>
      <button
        onClick={() => setSelectedPrediction('draw')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
          selectedPrediction === 'draw'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
        } touch-feedback`}
      >
        {selectedPrediction === 'draw' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
        Draw
      </button>
      <button
        onClick={() => setSelectedPrediction('away')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
          selectedPrediction === 'away'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
        } touch-feedback`}
      >
        {selectedPrediction === 'away' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
        {awayTeam.name} Win
      </button>
    </div>
  );
};

export default PredictionControls;
