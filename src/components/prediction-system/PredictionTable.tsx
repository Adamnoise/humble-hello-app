
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';

interface Prediction {
  homeTeam: string;
  awayTeam: string;
  prediction: 'home' | 'draw' | 'away';
  confidence: number;
  homeGoals: number;
  awayGoals: number;
  historyMatches: number;
}

interface PredictionTableProps {
  predictions: Prediction[];
  onRefresh: () => void;
}

const PredictionTable = ({ predictions, onRefresh }: PredictionTableProps) => {
  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'home': return 'bg-emerald-500/20 text-emerald-400';
      case 'draw': return 'bg-amber-500/20 text-amber-400';
      case 'away': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'text-emerald-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-gray-400';
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Aktuális forduló predikciói</h3>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
          onClick={onRefresh}
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Frissítés
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Hazai csapat</TableHead>
              <TableHead className="text-gray-400 font-normal">Vendég csapat</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Predikció</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Megbízhatóság</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Várható gólok (H)</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Várható gólok (V)</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Korábbi meccsek</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((pred, index) => (
              <TableRow key={index} className="border-b border-white/5 hover:bg-white/5">
                <TableCell className="text-white font-medium">{pred.homeTeam}</TableCell>
                <TableCell className="text-white">{pred.awayTeam}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPredictionColor(pred.prediction)}`}>
                    {pred.prediction === 'home' ? 'Hazai győzelem' : 
                    pred.prediction === 'draw' ? 'Döntetlen' : 'Vendég győzelem'}
                  </span>
                </TableCell>
                <TableCell className={`text-center font-bold ${getConfidenceColor(pred.confidence)}`}>
                  {pred.confidence}%
                </TableCell>
                <TableCell className="text-center text-emerald-400 font-medium">
                  {pred.homeGoals.toFixed(1)}
                </TableCell>
                <TableCell className="text-center text-blue-400 font-medium">
                  {pred.awayGoals.toFixed(1)}
                </TableCell>
                <TableCell className="text-center text-gray-300">
                  {pred.historyMatches}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PredictionTable;
