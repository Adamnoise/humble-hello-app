
import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { PREMIER_LEAGUE_TEAMS } from '../../data/premier-league-teams';
import MatchCardGrid from './MatchCardGrid';
import PredictionResultsSection from './PredictionResultsSection';

const MatchSelectionSection = () => {
  // State for selected teams in each match card (now 8 matches with none selected by default)
  const [selectedTeams, setSelectedTeams] = useState([
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
  ]);
  
  // State to track if prediction has been run
  const [predictionRun, setPredictionRun] = useState(false);
  
  // Calculate all selected team IDs to exclude from dropdowns
  const selectedTeamIds = useMemo(() => {
    const ids: string[] = [];
    selectedTeams.forEach(match => {
      if (match.home) ids.push(match.home.id);
      if (match.away) ids.push(match.away.id);
    });
    return ids;
  }, [selectedTeams]);
  
  // Filter available teams (excluding already selected ones)
  const availableTeams = useMemo(() => {
    return PREMIER_LEAGUE_TEAMS.filter(team => !selectedTeamIds.includes(team.id));
  }, [selectedTeamIds]);
  
  // Count completed matches
  const completedMatchesCount = useMemo(() => {
    return selectedTeams.filter(match => match.home && match.away).length;
  }, [selectedTeams]);
  
  const allMatchesCompleted = useMemo(() => {
    return completedMatchesCount === selectedTeams.length;
  }, [completedMatchesCount, selectedTeams]);
  
  // Dispatch event when matches are selected or prediction is run
  useEffect(() => {
    if (predictionRun) {
      const event = new CustomEvent('matchesSelected', {
        detail: {
          matches: selectedTeams,
          complete: allMatchesCompleted
        }
      });
      window.dispatchEvent(event);
    }
  }, [predictionRun, selectedTeams, allMatchesCompleted]);
  
  // Update team selection
  const handleTeamSelect = (matchIndex: number, side: 'home' | 'away', teamId: string) => {
    const team = PREMIER_LEAGUE_TEAMS.find(t => t.id === teamId) || null;
    
    setSelectedTeams(prev => {
      const updated = [...prev];
      // If this team was previously selected somewhere else, remove it
      updated.forEach((match, idx) => {
        if (idx !== matchIndex) {
          if (match.home?.id === teamId) updated[idx].home = null;
          if (match.away?.id === teamId) updated[idx].away = null;
        }
      });
      
      updated[matchIndex] = {
        ...updated[matchIndex],
        [side]: team
      };
      return updated;
    });
  };
  
  // Handle prediction submission
  const handleSubmitPredictions = () => {
    // Count how many complete matches we have
    const completeMatches = selectedTeams.filter(match => match.home && match.away).length;
    
    if (completeMatches === 0) {
      toast.error("Legalább egy mérkőzést ki kell választanod");
      return;
    }
    
    toast.success(`${completeMatches} mérkőzés predikciója elindítva`, {
      description: "Az eredmények elérhetőek alább"
    });
    
    setPredictionRun(true);
  };

  return (
    <div className="py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2.5 mb-3 bg-gradient-to-r from-blue-500/10 to-transparent px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Mérkőzések kiválasztása
              </h2>
            </div>
          </div>
        </div>
        
        {/* Match Selection Grid */}
        <MatchCardGrid 
          selectedTeams={selectedTeams}
          availableTeams={availableTeams}
          onTeamSelect={handleTeamSelect}
        />
        
        {/* Prediction Button */}
        <div className="flex justify-center my-8 animate-fade-in" style={{animationDelay: "0.5s"}}>
          <Button 
            onClick={handleSubmitPredictions}
            className="w-full max-w-xl py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden relative group"
          >
            <span className="z-10 relative">Predikciók futtatása</span>
            <ArrowRight className="w-5 h-5 z-10 relative group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </Button>
        </div>
        
        {/* Predictions Results Section */}
        {predictionRun && selectedTeams.some(match => match.home && match.away) && !allMatchesCompleted && (
          <PredictionResultsSection 
            selectedTeams={selectedTeams.filter(match => match.home && match.away)} 
          />
        )}
      </div>
    </div>
  );
};

export default MatchSelectionSection;
