
import React, { useState, useEffect } from 'react';
import { teams } from '../data/teams';
import MatchDetail from './MatchDetail';
import MatchFilters from './MatchFilters';
import MatchSorting, { SortField, SortDirection } from './MatchSorting';
import MatchHeader from './match/MatchHeader';
import LiveMatchSection from './match/LiveMatchSection';
import MatchTableView from './match/MatchTableView';

interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  ht?: string;
  ft?: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

const MatchSchedule = () => {
  const [matches, setMatches] = useState<Match[]>([
    { id: 1, date: '2025-04-04', time: '17:21', homeTeam: 'Wolverhampton', awayTeam: 'West Ham', ht: '2 - 0', ft: '4 - 0', status: 'completed', homeScore: 4, awayScore: 0 },
    { id: 2, date: '2025-04-04', time: '17:21', homeTeam: 'Vörös Ördögök', awayTeam: 'Nottingham', ht: '0 - 0', ft: '2 - 0', status: 'completed', homeScore: 2, awayScore: 0 },
    { id: 3, date: '2025-04-04', time: '17:21', homeTeam: 'Liverpool', awayTeam: 'Brentford', ht: '2 - 1', ft: '4 - 1', status: 'completed', homeScore: 4, awayScore: 1 },
    { id: 4, date: '2025-04-04', time: '17:21', homeTeam: 'Crystal Palace', awayTeam: 'Manchester Kék', ht: '0 - 1', ft: '2 - 1', status: 'completed', homeScore: 2, awayScore: 1 },
    { id: 5, date: '2025-04-05', time: '15:30', homeTeam: 'Brighton', awayTeam: 'Chelsea', status: 'live', homeScore: 1, awayScore: 2 },
    { id: 6, date: '2025-04-05', time: '15:30', homeTeam: 'Everton', awayTeam: 'Aston Oroszlán', status: 'live', homeScore: 0, awayScore: 0 },
    { id: 7, date: '2025-04-05', time: '18:00', homeTeam: 'London Ágyúk', awayTeam: 'Tottenham', status: 'upcoming' },
    { id: 8, date: '2025-04-06', time: '15:00', homeTeam: 'Fulham', awayTeam: 'Newcastle', status: 'upcoming' },
    { id: 9, date: '2025-04-06', time: '17:30', homeTeam: 'Manchester Kék', awayTeam: 'London Ágyúk', status: 'upcoming' },
    { id: 10, date: '2025-04-07', time: '20:00', homeTeam: 'Aston Oroszlán', awayTeam: 'Brighton', status: 'upcoming' },
    { id: 11, date: '2025-04-08', time: '19:45', homeTeam: 'Brentford', awayTeam: 'Vörös Ördögök', status: 'upcoming' },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{field: SortField; direction: SortDirection}>({
    field: 'date',
    direction: 'asc'
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...matches];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(match => 
        match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort matches
    result.sort((a, b) => {
      switch (sortConfig.field) {
        case 'date':
          const dateCompare = a.date.localeCompare(b.date);
          return sortConfig.direction === 'asc' ? dateCompare : -dateCompare;
        
        case 'league':
          // In a real app, you'd compare league names here
          return 0;
        
        case 'team':
          const aTeams = a.homeTeam + a.awayTeam;
          const bTeams = b.homeTeam + b.awayTeam;
          return sortConfig.direction === 'asc' ? 
            aTeams.localeCompare(bTeams) : 
            bTeams.localeCompare(aTeams);
        
        case 'score':
          // For upcoming matches with no score, we'll put them at the end
          if (!a.homeScore && !b.homeScore) return 0;
          if (!a.homeScore) return sortConfig.direction === 'asc' ? 1 : -1;
          if (!b.homeScore) return sortConfig.direction === 'asc' ? -1 : 1;
          
          const aTotal = a.homeScore + a.awayScore;
          const bTotal = b.homeScore + b.awayScore;
          return sortConfig.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        
        default:
          return 0;
      }
    });
    
    setFilteredMatches(result);
  }, [matches, searchTerm, sortConfig]);

  const handleFilterChange = (filters: any) => {
    let result = [...matches];
    
    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      result = result.filter(match => {
        const matchDate = new Date(match.date);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && matchDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          isInRange = isInRange && matchDate <= filters.dateRange.to;
        }
        
        return isInRange;
      });
    }
    
    // Status filter
    if (filters.statuses.length > 0) {
      result = result.filter(match => filters.statuses.includes(match.status));
    }
    
    // In a real app, you'd also filter by leagues and teams here
    setFilteredMatches(result);
  };

  // Find team object by name
  const findTeamByName = (name: string) => {
    return teams.find(team => team.name === name) || {
      id: 0,
      name,
      logo: '',
      form: '',
      position: 0
    };
  };

  // Handle match click to show details
  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsDetailOpen(true);
  };
  
  // Handle sort change
  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });
  };

  const liveMatches = matches.filter(match => match.status === 'live');

  return (
    <div className="p-6 space-y-6">
      <MatchHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <MatchFilters onFilterChange={handleFilterChange} />
        <MatchSorting onSortChange={handleSortChange} currentSort={sortConfig} />
      </div>
      
      {/* Live Matches Section */}
      <LiveMatchSection 
        liveMatches={liveMatches}
        findTeamByName={findTeamByName}
        onMatchClick={handleMatchClick}
      />
      
      {/* Match Table */}
      <MatchTableView 
        matches={filteredMatches}
        isLoading={isLoading}
        onMatchClick={handleMatchClick}
      />
      
      {/* Match Detail Modal */}
      {selectedMatch && (
        <MatchDetail 
          match={selectedMatch} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default MatchSchedule;
