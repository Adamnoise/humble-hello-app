
import React from 'react';
import { BarChart3, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  dataUpdatedAt: Date;
  isRefreshing: boolean;
  onRefresh: () => void;
  actionButton?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  dataUpdatedAt,
  isRefreshing,
  onRefresh,
  actionButton
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          {title}
        </h1>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-xs text-gray-400">
          Last updated: {dataUpdatedAt.toLocaleString()}
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          disabled={isRefreshing}
          onClick={onRefresh}
          className="bg-black/20 border-white/10 text-blue-400 h-8 w-8"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4"
            >
              <path d="M21 2v6h-6"></path>
              <path d="M21 13a9 9 0 1 1-3-7.7L21 8"></path>
            </svg>
          )}
        </Button>
        
        {actionButton}
      </div>
    </div>
  );
};

export default DashboardHeader;
