
import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { toast } from 'sonner';
import SystemProperties from './prediction-system/SystemProperties';
import ModelSelector from './prediction-system/ModelSelector';
import PredictionTable from './prediction-system/PredictionTable';
import SystemDescription from './prediction-system/SystemDescription';

const PredictionSystem = () => {
  const [activeModel, setActiveModel] = useState<string>("random-forest");
  
  // Szimulált predikciós eredmények
  const predictions = [
    { 
      homeTeam: "Liverpool", 
      awayTeam: "Chelsea", 
      prediction: "home", 
      confidence: 76, 
      homeGoals: 2.1, 
      awayGoals: 0.8, 
      historyMatches: 42 
    },
    { 
      homeTeam: "Vörös Ördögök", 
      awayTeam: "Manchester Kék", 
      prediction: "draw", 
      confidence: 68, 
      homeGoals: 1.2, 
      awayGoals: 1.3, 
      historyMatches: 38 
    },
    { 
      homeTeam: "Tottenham", 
      awayTeam: "London Ágyúk", 
      prediction: "away", 
      confidence: 64, 
      homeGoals: 1.0, 
      awayGoals: 1.8, 
      historyMatches: 29 
    },
    { 
      homeTeam: "Wolverhampton", 
      awayTeam: "Everton", 
      prediction: "home", 
      confidence: 72, 
      homeGoals: 1.7, 
      awayGoals: 0.6, 
      historyMatches: 24 
    },
  ];

  const handleRefreshData = () => {
    toast.success("Adatok sikeresen frissítve", {
      description: `Minden mérkőzés adat frissítve: ${new Date().toLocaleTimeString()}`
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Brain className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">V-Sports Elemzési Rendszer</h2>
          <p className="text-gray-400 text-sm">
            Matematikai modellek alapján készített predikciók, zárt rendszerű virtuális sportok elemzéséhez.
          </p>
        </div>
      </div>

      <SystemProperties />
      <ModelSelector activeModel={activeModel} setActiveModel={setActiveModel} />
      <PredictionTable predictions={predictions} onRefresh={handleRefreshData} />
      <SystemDescription />
    </div>
  );
};

export default PredictionSystem;
