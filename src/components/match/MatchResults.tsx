
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { Team } from '../../data/premier-league-teams';

interface MatchResultProps {
  matches: { home: Team | null; away: Team | null }[];
}

const MatchResults: React.FC<MatchResultProps> = ({ matches }) => {
  const [matchResults, setMatchResults] = useState(
    matches.map(() => ({ homeGoals: 0, awayGoals: 0 }))
  );

  const handleHomeGoalChange = (index: number, value: number) => {
    const updated = [...matchResults];
    updated[index].homeGoals = value >= 0 ? value : 0;
    setMatchResults(updated);
  };

  const handleAwayGoalChange = (index: number, value: number) => {
    const updated = [...matchResults];
    updated[index].awayGoals = value >= 0 ? value : 0;
    setMatchResults(updated);
  };

  const handleSaveResults = () => {
    toast.success("Mérkőzés eredmények sikeresen elmentve!", {
      description: "Az eredmények elérhetők az elemzésekhez."
    });
    console.log("Saved match results:", matchResults);
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6">Mérkőzés Eredmények Megadása</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match, index) => (
          match.home && match.away ? (
            <div key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex flex-col items-center flex-1">
                  <img 
                    src={match.home.logoUrl} 
                    alt={match.home.name} 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xs text-gray-300 mt-1 text-center">{match.home.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    value={matchResults[index].homeGoals}
                    onChange={(e) => handleHomeGoalChange(index, parseInt(e.target.value) || 0)}
                    className="w-12 h-12 text-center text-white bg-gray-800/80 rounded-lg border border-white/10 text-lg font-bold"
                  />
                  <span className="text-gray-400 font-bold">:</span>
                  <input
                    type="number"
                    min="0"
                    value={matchResults[index].awayGoals}
                    onChange={(e) => handleAwayGoalChange(index, parseInt(e.target.value) || 0)}
                    className="w-12 h-12 text-center text-white bg-gray-800/80 rounded-lg border border-white/10 text-lg font-bold"
                  />
                </div>
                
                <div className="flex flex-col items-center flex-1">
                  <img 
                    src={match.away.logoUrl} 
                    alt={match.away.name} 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xs text-gray-300 mt-1 text-center">{match.away.name}</span>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleSaveResults}
          className="py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden relative group px-8"
        >
          <Check className="w-5 h-5" />
          <span className="z-10 relative">Eredmények Mentése</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </Button>
      </div>
    </div>
  );
};

export default MatchResults;
