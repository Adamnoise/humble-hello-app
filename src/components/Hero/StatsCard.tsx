
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
}

const StatsCard = ({ icon: Icon, title, value, subtitle }: StatsCardProps) => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <span className="text-sm font-medium text-blue-400">{title}</span>
      </div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-400">{subtitle}</span>
    </div>
  );
};

export default StatsCard;
