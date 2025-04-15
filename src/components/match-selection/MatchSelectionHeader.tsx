
import React from 'react';
import { Calendar } from 'lucide-react';

const MatchSelectionHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
      <div className="animate-fade-in">
        <div className="inline-flex items-center gap-2.5 mb-3 bg-gradient-to-r from-blue-500/10 to-transparent px-4 py-2 rounded-full">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Mérkőzések kiválasztása
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MatchSelectionHeader;
