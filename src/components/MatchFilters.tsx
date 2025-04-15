
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DateRangeFilter from './filter/DateRangeFilter';
import CheckboxFilter from './filter/CheckboxFilter';

// Mock data - would come from your data source
const leagues = [
  { id: 1, name: 'Premier League', country: 'England' },
  { id: 2, name: 'La Liga', country: 'Spain' },
  { id: 3, name: 'Bundesliga', country: 'Germany' },
  { id: 4, name: 'Serie A', country: 'Italy' },
  { id: 5, name: 'Ligue 1', country: 'France' },
];

const teams = [
  { id: 1, name: 'Vörös Ördögök', league: 'Premier League' },
  { id: 2, name: 'Liverpool', league: 'Premier League' },
  { id: 3, name: 'Manchester Kék', league: 'Premier League' },
  { id: 4, name: 'London Ágyúk', league: 'Premier League' },
  { id: 5, name: 'Real Madrid', league: 'La Liga' },
  { id: 6, name: 'Barcelona', league: 'La Liga' },
  { id: 7, name: 'Bayern Munich', league: 'Bundesliga' },
  { id: 8, name: 'Juventus', league: 'Serie A' },
  { id: 9, name: 'PSG', league: 'Ligue 1' },
];

const statuses = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'live', name: 'Live' },
  { id: 'completed', name: 'Completed' },
];

interface MatchFiltersProps {
  onFilterChange: (filters: {
    dateRange: { from: Date | null; to: Date | null };
    leagues: number[];
    teams: number[];
    statuses: string[];
  }) => void;
}

const MatchFilters: React.FC<MatchFiltersProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleDateSelect = (range: { from: Date | null; to: Date | null }) => {
    setDateRange(range);
    updateFilters(range, selectedLeagues, selectedTeams, selectedStatuses);
  };

  const toggleLeague = (leagueId: number) => {
    const updatedLeagues = selectedLeagues.includes(leagueId)
      ? selectedLeagues.filter(id => id !== leagueId)
      : [...selectedLeagues, leagueId];
    
    setSelectedLeagues(updatedLeagues);
    updateFilters(dateRange, updatedLeagues, selectedTeams, selectedStatuses);
  };

  const toggleTeam = (teamId: number) => {
    const updatedTeams = selectedTeams.includes(teamId as number)
      ? selectedTeams.filter(id => id !== teamId)
      : [...selectedTeams, teamId as number];
    
    setSelectedTeams(updatedTeams);
    updateFilters(dateRange, selectedLeagues, updatedTeams, selectedStatuses);
  };

  const toggleStatus = (statusId: string) => {
    const updatedStatuses = selectedStatuses.includes(statusId)
      ? selectedStatuses.filter(id => id !== statusId)
      : [...selectedStatuses, statusId];
    
    setSelectedStatuses(updatedStatuses);
    updateFilters(dateRange, selectedLeagues, selectedTeams, updatedStatuses);
  };

  const updateFilters = (
    date: { from: Date | null; to: Date | null },
    leagues: number[],
    teams: number[],
    statuses: string[]
  ) => {
    onFilterChange({
      dateRange: date,
      leagues,
      teams,
      statuses
    });
  };

  const clearFilters = () => {
    setDateRange({ from: null, to: null });
    setSelectedLeagues([]);
    setSelectedTeams([]);
    setSelectedStatuses([]);
    onFilterChange({
      dateRange: { from: null, to: null },
      leagues: [],
      teams: [],
      statuses: []
    });
  };

  const hasFilters = dateRange.from || dateRange.to || selectedLeagues.length > 0 || selectedTeams.length > 0 || selectedStatuses.length > 0;

  const getSelectedCount = () => {
    let count = 0;
    if (dateRange.from || dateRange.to) count++;
    if (selectedLeagues.length > 0) count++;
    if (selectedTeams.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    return count;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      {/* Date Range Filter */}
      <DateRangeFilter
        dateRange={dateRange}
        isOpen={isDateOpen}
        setIsOpen={setIsDateOpen}
        onSelect={handleDateSelect}
      />

      {/* League Filter */}
      <CheckboxFilter
        label="Leagues"
        items={leagues.map(league => ({ ...league, description: league.country }))}
        selectedIds={selectedLeagues}
        isOpen={isLeagueOpen}
        setIsOpen={setIsLeagueOpen}
        onToggleItem={toggleLeague}
        searchPlaceholder="Search leagues..."
      />

      {/* Team Filter */}
      <CheckboxFilter
        label="Teams"
        items={teams.map(team => ({ ...team, description: team.league }))}
        selectedIds={selectedTeams}
        isOpen={isTeamOpen}
        setIsOpen={setIsTeamOpen}
        onToggleItem={toggleTeam}
        searchPlaceholder="Search teams..."
      />

      {/* Status Filter */}
      <CheckboxFilter
        label="Status"
        items={statuses}
        selectedIds={selectedStatuses}
        isOpen={isStatusOpen}
        setIsOpen={setIsStatusOpen}
        onToggleItem={toggleStatus}
        showSearch={false}
      />

      {/* Clear Filters Button */}
      {hasFilters && (
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
        >
          <X className="h-4 w-4 mr-2" />
          Clear ({getSelectedCount()})
        </Button>
      )}
    </div>
  );
};

export default MatchFilters;
