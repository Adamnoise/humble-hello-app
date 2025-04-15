
import React from 'react';
import { Percent } from 'lucide-react';
import { Team } from '../../../data/premier-league-teams';

interface StatsSectionProps {
  homeTeam: Team;
  awayTeam: Team;
  bothTeamsScoreChance: number;
  homeGoalChance: number;
  awayGoalChance: number;
  overUnderLine: number;
  overChance: number;
  underChance: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  homeTeam,
  awayTeam,
  bothTeamsScoreChance,
  homeGoalChance,
  awayGoalChance,
  overUnderLine,
  overChance,
  underChance
}) => {
  return (
    <div className="mt-6 space-y-4 animate-fade-in" style={{animationDuration: '0.3s'}}>
      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
        <h4 className="text-xs font-medium text-gray-400 mb-3 flex items-center gap-1">
          <Percent className="h-3 w-3" />
          <span>További statisztikák</span>
        </h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white">Mindkét csapat gólt szerez</span>
              <span className="text-blue-400">{bothTeamsScoreChance}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{width: `${bothTeamsScoreChance}%`}}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white">{homeTeam.name} gólt szerez</span>
                <span className="text-blue-400">{homeGoalChance}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width: `${homeGoalChance}%`}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white">{awayTeam.name} gólt szerez</span>
                <span className="text-blue-400">{awayGoalChance}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width: `${awayGoalChance}%`}}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white">Több mint {overUnderLine} gól</span>
                <span className="text-blue-400">{overChance}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{width: `${overChance}%`}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white">Kevesebb mint {overUnderLine} gól</span>
                <span className="text-blue-400">{underChance}%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{width: `${underChance}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
