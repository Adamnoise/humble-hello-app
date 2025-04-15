
import React from 'react';
import MatchCard from './MatchCard';
import { Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { teams, hungarianLeague } from '../data/teams';
import { generateHeadToHead } from '../data/teams';
import { MatchProps } from '../types/match';

// Generate mock matches
const generateMockMatches = () => {
  const mockMatches: MatchProps[] = [];
  
  // Generate matches with predetermined teams
  mockMatches.push({
    id: 1,
    time: '19:00',
    homeTeam: teams[0], // Ferencváros
    awayTeam: teams[3], // Újpest
    isSelectable: true,
    league: hungarianLeague,
    headToHead: generateHeadToHead(teams[0].id, teams[3].id)
  });
  
  mockMatches.push({
    id: 2,
    time: '16:30',
    homeTeam: teams[2], // Debrecen
    awayTeam: teams[1], // Puskás Akadémia
    isSelectable: true,
    league: hungarianLeague,
    headToHead: generateHeadToHead(teams[2].id, teams[1].id)
  });
  
  // Add a match with empty teams
  mockMatches.push({
    id: 3,
    time: '21:00',
    homeTeam: null,
    awayTeam: null,
    isSelectable: true,
    league: hungarianLeague
  });
  
  return mockMatches;
};

const UpcomingMatches = () => {
  const matches = generateMockMatches();
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
            <div className="inline-flex items-center gap-2.5 mb-3 bg-gradient-to-r from-blue-500/10 to-transparent px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Mai kiemelt mérkőzések
              </h2>
            </div>
            <p className="text-gray-400 pl-2">Válassz csapatokat és küldd el tippjeidet</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-blue-500/10 backdrop-blur-sm rounded-full px-4 py-2.5 border border-blue-500/20 shadow-[0_4px_20px_rgba(59,130,246,0.15)] animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              <strong className="text-blue-300">2 547</strong> tipp ma
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {matches.map((match, index) => (
            <div key={match.id} className="animate-slide-in-bottom" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
              <MatchCard 
                {...match}
              />
            </div>
          ))}
        </div>
        
        {/* Empty state / info message with Neomorphism */}
        <div className="mt-12 flex justify-center animate-fade-in" style={{animationDelay: '0.8s'}}>
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-500/10 to-transparent backdrop-blur-md rounded-full border border-blue-500/20">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">További mérkőzések délután kerülnek közzétételre</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
