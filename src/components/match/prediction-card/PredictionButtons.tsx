
import React from 'react';

const PredictionButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        <span>Hazai</span>
      </button>
      <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
        <span>Döntetlen</span>
      </button>
      <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        <span>Vendég</span>
      </button>
    </div>
  );
};

export default PredictionButtons;
