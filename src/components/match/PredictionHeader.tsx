
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface PredictionHeaderProps {
  isLive?: boolean;
  matchTime?: string;
}

const PredictionHeader: React.FC<PredictionHeaderProps> = ({ 
  isLive = true,
  matchTime = "21:00"
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className={`${isLive ? 'bg-red-500/20' : 'bg-blue-500/20'} backdrop-blur-md rounded-full px-3 py-1.5 border ${isLive ? 'border-red-400/20' : 'border-blue-400/20'}`}>
        <span className={`text-xs font-medium ${isLive ? 'text-red-300' : 'text-blue-300'} flex items-center gap-1.5`}>
          {isLive && <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>}
          {isLive ? 'Élő mérkőzés' : 'Upcoming match'}
        </span>
      </div>
      <Badge 
        variant="outline" 
        className={`text-xs font-medium ${isLive ? 'text-red-400 bg-red-500/10 border-red-400/10' : 'text-blue-400 bg-blue-500/10 border-blue-400/10'} flex items-center gap-1.5`}
      >
        <Clock className="h-3 w-3" />
        {matchTime}
      </Badge>
    </div>
  );
};

export default PredictionHeader;
