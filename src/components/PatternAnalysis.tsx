
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineChart, TrendingUp, BarChart4, PieChart, ArrowDownUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HalfTimeFullTimePattern, TurnaroundPrediction } from '../types/match';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample data for patterns
const patternData: HalfTimeFullTimePattern[] = [
  {
    id: 1,
    homeTeam: "Nottingham",
    awayTeam: "Wolverhampton",
    htHomeScore: 0,
    htAwayScore: 0,
    ftHomeScore: 0,
    ftAwayScore: 2,
    turnaround: true,
    turnaroundType: 'draw-to-away',
    date: '2025-03-15',
    consistency: 86
  },
  {
    id: 2,
    homeTeam: "Chelsea",
    awayTeam: "London Ágyúk",
    htHomeScore: 0,
    htAwayScore: 1,
    ftHomeScore: 2,
    ftAwayScore: 1,
    turnaround: true,
    turnaroundType: 'away-to-home',
    date: '2025-03-20',
    consistency: 74
  },
  {
    id: 3,
    homeTeam: "Liverpool",
    awayTeam: "Vörös Ördögök",
    htHomeScore: 1,
    htAwayScore: 1,
    ftHomeScore: 1,
    ftAwayScore: 1,
    turnaround: false,
    turnaroundType: 'none',
    date: '2025-03-22',
    consistency: 62
  },
  {
    id: 4,
    homeTeam: "Everton",
    awayTeam: "Crystal Palace",
    htHomeScore: 1,
    htAwayScore: 0,
    ftHomeScore: 1,
    ftAwayScore: 0,
    turnaround: false,
    turnaroundType: 'none',
    date: '2025-03-28',
    consistency: 89
  },
  {
    id: 5,
    homeTeam: "Brentford",
    awayTeam: "Brighton",
    htHomeScore: 0,
    htAwayScore: 0,
    ftHomeScore: 0,
    ftAwayScore: 2,
    turnaround: true,
    turnaroundType: 'draw-to-away',
    date: '2025-04-01',
    consistency: 77
  }
];

// Sample data for turnaround predictions
const turnaroundPredictions: TurnaroundPrediction[] = [
  {
    homeTeam: "Nottingham",
    awayTeam: "Wolverhampton",
    predictedOutcome: 'turnaround',
    confidenceScore: 86,
    consistentPatternCount: 7,
    odds: 4.5
  },
  {
    homeTeam: "Chelsea",
    awayTeam: "Manchester Kék",
    predictedOutcome: 'turnaround',
    confidenceScore: 72,
    consistentPatternCount: 5,
    odds: 6.0
  },
  {
    homeTeam: "Aston Oroszlán",
    awayTeam: "Liverpool",
    predictedOutcome: 'no-turnaround',
    confidenceScore: 68,
    consistentPatternCount: 4,
    odds: 2.1
  },
  {
    homeTeam: "Newcastle",
    awayTeam: "Tottenham",
    predictedOutcome: 'turnaround',
    confidenceScore: 64,
    consistentPatternCount: 4,
    odds: 7.5
  }
];

const PatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patterns');

  const getTurnaroundBadge = (type: string) => {
    switch (type) {
      case 'draw-to-home':
        return <Badge className="bg-emerald-500">Döntetlen → Hazai győzelem</Badge>;
      case 'draw-to-away':
        return <Badge className="bg-blue-500">Döntetlen → Vendég győzelem</Badge>;
      case 'home-to-away':
        return <Badge className="bg-purple-500">Hazai vezetés → Vendég győzelem</Badge>;
      case 'away-to-home':
        return <Badge className="bg-amber-500">Vendég vezetés → Hazai győzelem</Badge>;
      case 'home-to-draw':
        return <Badge className="bg-gray-500">Hazai vezetés → Döntetlen</Badge>;
      case 'away-to-draw':
        return <Badge className="bg-pink-500">Vendég vezetés → Döntetlen</Badge>;
      default:
        return <Badge className="bg-gray-700">Nincs fordulat</Badge>;
    }
  };

  const getConsistencyColor = (consistency: number) => {
    if (consistency >= 80) return "text-emerald-400";
    if (consistency >= 65) return "text-amber-400";
    return "text-gray-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-bold text-white">Fordulat Minták Elemzése</h2>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black/20 w-full grid grid-cols-2">
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-500/20">
            Félidő/Végeredmény Minták
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-500/20">
            Fordulat Előrejelzések
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="patterns" className="pt-4">
          <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ArrowDownUp className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium text-white">Félidő/Végeredmény Fordulat Minták</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Ez a táblázat a félidei és végeredmény közötti mintákat mutatja, különös tekintettel a 
              fordulatokra. A "Konzisztencia" érték azt jelzi, hogy az adott minta milyen gyakorisággal 
              ismétlődik hasonló körülmények között.
            </p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-normal">Dátum</TableHead>
                    <TableHead className="text-gray-400 font-normal">Hazai csapat</TableHead>
                    <TableHead className="text-gray-400 font-normal">Vendég csapat</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Félidő</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Végeredmény</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Fordulat típusa</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Konzisztencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patternData.map((pattern) => (
                    <TableRow key={pattern.id} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="text-gray-300">
                        {new Date(pattern.date).toLocaleDateString('hu-HU')}
                      </TableCell>
                      <TableCell className="text-white">{pattern.homeTeam}</TableCell>
                      <TableCell className="text-white">{pattern.awayTeam}</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-800 text-white">
                          {pattern.htHomeScore} - {pattern.htAwayScore}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-white">
                          {pattern.ftHomeScore} - {pattern.ftAwayScore}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getTurnaroundBadge(pattern.turnaroundType)}
                      </TableCell>
                      <TableCell className={`text-center font-bold ${getConsistencyColor(pattern.consistency)}`}>
                        {pattern.consistency}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="pt-4">
          <div className="bg-gray-900/40 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-4 w-4 text-emerald-400" />
              <h3 className="font-medium text-white">Fordulat Előrejelzések</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Az alábbi előrejelzések a korábbi fordulat mintákon alapulnak. A "Megbízhatóság" azt jelzi, hogy milyen
              valószínűséggel következik be a jelzett esemény az adott mérkőzésen, történeti adatok alapján.
            </p>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-normal">Hazai csapat</TableHead>
                    <TableHead className="text-gray-400 font-normal">Vendég csapat</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Előrejelzés</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Megbízhatóság</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Minta szám</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Odds érték</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {turnaroundPredictions.map((prediction, index) => (
                    <TableRow key={index} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="text-white font-medium">{prediction.homeTeam}</TableCell>
                      <TableCell className="text-white">{prediction.awayTeam}</TableCell>
                      <TableCell className="text-center">
                        {prediction.predictedOutcome === 'turnaround' ? (
                          <Badge className="bg-purple-500/80 text-white">Fordulat várható</Badge>
                        ) : (
                          <Badge className="bg-gray-500/80 text-white">Stabil eredmény</Badge>
                        )}
                      </TableCell>
                      <TableCell className={`text-center font-bold ${getConsistencyColor(prediction.confidenceScore)}`}>
                        {prediction.confidenceScore}%
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                {prediction.consistentPatternCount}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>A predikció {prediction.consistentPatternCount} konzisztens mintán alapul</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-blue-900/60">
                          {prediction.odds.toFixed(2)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatternAnalysis;
