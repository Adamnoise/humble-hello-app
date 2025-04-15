import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { PREMIER_LEAGUE_TEAMS } from '../../data/premier-league-teams';
import MatchCardGrid from './MatchCardGrid';
import PredictionResultsSection from './PredictionResultsSection';
import MatchSelectionHeader from './MatchSelectionHeader';
import MatchSubmitButton from './MatchSubmitButton';

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

  const handleSubmitPredictions = () => {
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
        <MatchSelectionHeader />
        
        <MatchCardGrid 
          selectedTeams={selectedTeams}
          availableTeams={availableTeams}
          onTeamSelect={handleTeamSelect}
        />
        
        <MatchSubmitButton onClick={handleSubmitPredictions} />
        
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
