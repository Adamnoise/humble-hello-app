
import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MatchHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-emerald-500" />
        <h2 className="text-xl font-bold text-white">Match Schedule</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search teams..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
