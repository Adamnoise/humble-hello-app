
import React from 'react';
import { ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type SortField = 'date' | 'league' | 'team' | 'score';
export type SortDirection = 'asc' | 'desc';

interface MatchSortingProps {
  onSortChange: (field: SortField, direction: SortDirection) => void;
  currentSort: { field: SortField, direction: SortDirection };
}

const MatchSorting: React.FC<MatchSortingProps> = ({ onSortChange, currentSort }) => {
  const sortOptions = [
    { field: 'date', label: 'Date', icon: currentSort.field === 'date' ? (currentSort.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />) : null },
    { field: 'league', label: 'League', icon: currentSort.field === 'league' ? (currentSort.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />) : null },
    { field: 'team', label: 'Team', icon: currentSort.field === 'team' ? (currentSort.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />) : null },
    { field: 'score', label: 'Score', icon: currentSort.field === 'score' ? (currentSort.direction === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />) : null },
  ];

  const handleSort = (field: SortField) => {
    const newDirection = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newDirection);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 text-sm">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
            <span>{sortOptions.find(option => option.field === currentSort.field)?.label || 'Date'}</span>
            {sortOptions.find(option => option.field === currentSort.field)?.icon || <ChevronDown className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card border-white/10">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.field}
              onClick={() => handleSort(option.field as SortField)}
              className={`flex items-center justify-between ${currentSort.field === option.field ? 'text-blue-400' : 'text-white'}`}
            >
              {option.label}
              {option.icon}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MatchSorting;
