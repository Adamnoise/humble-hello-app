
import React from 'react';
import { Trophy, Star, ArrowUp } from 'lucide-react';

interface PredictionItem {
  id: number;
  userName: string;
  avatar: string;
  points: number;
  accuracy: number;
  streak: number;
}

const topPredictions: PredictionItem[] = [
  {
    id: 1,
    userName: "FociBajnok22",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    points: 1250,
    accuracy: 83,
    streak: 7
  },
  {
    id: 2,
    userName: "MesterTippelo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
    points: 1120,
    accuracy: 79,
    streak: 5
  },
  {
    id: 3,
    userName: "Prediktátor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    points: 980,
    accuracy: 74,
    streak: 3
  },
  {
    id: 4,
    userName: "SportGuru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    points: 870,
    accuracy: 71,
    streak: 2
  },
  {
    id: 5,
    userName: "BajnokTipp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy",
    points: 790,
    accuracy: 68,
    streak: 4
  }
];

const TopPredictions = () => {
  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Legjobb Tippelők</h3>
      </div>
      
      <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 p-4 border-b border-white/5 bg-black/20">
          <div className="col-span-1 text-xs font-medium text-blue-300">#</div>
          <div className="col-span-4 text-xs font-medium text-blue-300">Felhasználó</div>
          <div className="col-span-3 text-xs font-medium text-blue-300 text-center">Pontszám</div>
          <div className="col-span-2 text-xs font-medium text-blue-300 text-center">Pontosság</div>
          <div className="col-span-2 text-xs font-medium text-blue-300 text-center">Széria</div>
        </div>
        
        {/* Items */}
        {topPredictions.map((item) => (
          <div 
            key={item.id} 
            className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-white/5 transition-colors duration-200"
          >
            <div className="col-span-1 font-semibold text-white">#{item.id}</div>
            <div className="col-span-4 flex items-center gap-2">
              <img 
                src={item.avatar} 
                alt={item.userName} 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-0.5"
              />
              <span className="text-sm text-white">{item.userName}</span>
            </div>
            <div className="col-span-3 text-center">
              <span className="text-yellow-400 font-medium">{item.points}</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-blue-300 text-sm">{item.accuracy}%</span>
            </div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1">
              <ArrowUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-sm">{item.streak}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPredictions;
