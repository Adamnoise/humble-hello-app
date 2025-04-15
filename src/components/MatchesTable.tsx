
import React, { useState } from 'react';
import { Search, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Match } from "../types/league";

interface MatchesTableProps {
  matches: Match[];
}

export const MatchesTable: React.FC<MatchesTableProps> = ({ matches }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Match | '';
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });

  const handleSort = (key: keyof Match) => {
    setSortConfig(currentConfig => {
      if (currentConfig.key === key) {
        return { 
          key, 
          direction: currentConfig.direction === 'asc' ? 'desc' : 'asc' 
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const filteredMatches = matches.filter(match => 
    match.home_team.toLowerCase().includes(searchTerm.toLowerCase()) || 
    match.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.round?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search matches..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <Button 
            variant="outline"
            size="sm" 
            className="bg-black/20 border-white/10 text-white text-sm flex items-center gap-2"
            onClick={() => handleSort('date')}
          >
            Date
            {sortConfig.key === 'date' && (
              sortConfig.direction === 'asc' ? 
              <ArrowUp className="h-3 w-3" /> : 
              <ArrowDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Date</TableHead>
              <TableHead className="text-gray-400 font-normal">Round</TableHead>
              <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">HT</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">FT</TableHead>
              <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMatches.length > 0 ? (
              sortedMatches.map((match, index) => (
                <TableRow key={index} className="border-b border-white/10 hover:bg-white/5">
                  <TableCell className="text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {formatDate(match.date)}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-300">{match.round || 'N/A'}</TableCell>
                  <TableCell className="text-sm font-medium text-white">{match.home_team}</TableCell>
                  <TableCell className="text-sm text-center text-gray-300">
                    {match.ht_home_score} - {match.ht_away_score}
                  </TableCell>
                  <TableCell className="text-sm text-center font-bold text-white">
                    {match.home_score} - {match.away_score}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-white">{match.away_team}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No matches found. Try adjusting your search or upload match data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-right text-sm text-gray-400">
        Showing {sortedMatches.length} of {matches.length} matches
      </div>
    </div>
  );
};
