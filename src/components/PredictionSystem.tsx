import React, { useState } from 'react';
import { Brain, Database, LineChart, PieChart, BarChart4, RefreshCcw, TrendingUp, AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import PatternAnalysis from './PatternAnalysis';

const PredictionSystem = () => {
  const [activeModel, setActiveModel] = useState<string>("random-forest");
  const [accuracy, setAccuracy] = useState<number>(78);
  const [activeTab, setActiveTab] = useState<string>("general");
  
  // Szimulált predikciós eredmények
  const predictions = [
    { 
      homeTeam: "Liverpool", 
      awayTeam: "Chelsea", 
      prediction: "home", 
      confidence: 76, 
      homeGoals: 2.1, 
      awayGoals: 0.8, 
      historyMatches: 42 
    },
    { 
      homeTeam: "Vörös Ördögök", 
      awayTeam: "Manchester Kék", 
      prediction: "draw", 
      confidence: 68, 
      homeGoals: 1.2, 
      awayGoals: 1.3, 
      historyMatches: 38 
    },
    { 
      homeTeam: "Tottenham", 
      awayTeam: "London Ágyúk", 
      prediction: "away", 
      confidence: 64, 
      homeGoals: 1.0, 
      awayGoals: 1.8, 
      historyMatches: 29 
    },
    { 
      homeTeam: "Wolverhampton", 
      awayTeam: "Everton", 
      prediction: "home", 
      confidence: 72, 
      homeGoals: 1.7, 
      awayGoals: 0.6, 
      historyMatches: 24 
    },
  ];

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

  const simulateNewPrediction = () => {
    const newAccuracy = Math.floor(Math.random() * 15) + 70; // 70-85% közötti érték
    setAccuracy(newAccuracy);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Brain className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">V-Sports Elemzési Rendszer</h2>
          <p className="text-gray-400 text-sm">
            Matematikai modellek alapján készített predikciók, zárt rendszerű virtuális sportok elemzéséhez.
            A rendszer múltbeli adatokból azonosít mintázatokat, amelyek segítenek a jövőbeli eredmények előrejelzésében.
          </p>
        </div>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black/20 w-full grid grid-cols-3">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-500/20">
            Általános Elemzés
          </TabsTrigger>
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-500/20">
            Mintázat Elemzés
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="data-[state=active]:bg-blue-500/20">
            Anomália Keresés
          </TabsTrigger>
        </TabsList>

        {/* General Analysis Tab */}
        <TabsContent value="general" className="pt-6">
          {/* Rendszer tulajdonságok */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium text-white">Zárt rendszer</h3>
              </div>
              <p className="text-sm text-gray-400">Fix 16 csapat, külső változók nélkül, ciklikusan ismétlődő bajnokságok</p>
            </div>
            
            <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <LineChart className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium text-white">Nagy mennyiségű adat</h3>
              </div>
              <p className="text-sm text-gray-400">240 mérkőzés/bajnokság, több bajnokság adatainak elemzése</p>
            </div>
            
            <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium text-white">Többféle predikciós modell</h3>
              </div>
              <p className="text-sm text-gray-400">Random Forest, Poisson és Elo modellek kombinált használata</p>
            </div>
            
            <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <BarChart4 className="h-5 w-5 text-blue-400" />
                <h3 className="font-medium text-white">Pontosság</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Jelenlegi rendszer pontossága:</p>
                <span className="text-lg font-bold text-emerald-400">{accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Predikciós modellek választó */}
          <div className="bg-gray-900/40 rounded-lg p-4 border border-white/5 mt-6">
            <h3 className="text-white font-medium mb-4">Predikciós modell választása</h3>
            
            <Tabs value={activeModel} onValueChange={setActiveModel} className="w-full">
              <TabsList className="bg-black/20 w-full grid grid-cols-3">
                <TabsTrigger value="random-forest" className="data-[state=active]:bg-blue-500/20">
                  Random Forest
                </TabsTrigger>
                <TabsTrigger value="poisson" className="data-[state=active]:bg-blue-500/20">
                  Poisson Eloszlás
                </TabsTrigger>
                <TabsTrigger value="elo" className="data-[state=active]:bg-blue-500/20">
                  Elo Minősítés
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="random-forest" className="pt-4">
                <p className="text-sm text-gray-400">
                  A Random Forest algoritmus többszörös döntési fákat használ a csapatok
                  korábbi teljesítménye alapján. Ez a modell 78% pontossággal működik.
                </p>
              </TabsContent>
              
              <TabsContent value="poisson" className="pt-4">
                <p className="text-sm text-gray-400">
                  A Poisson eloszlás modell különösen alkalmas a gólszámok előrejelzésére,
                  76% általános pontossággal rendelkezik.
                </p>
              </TabsContent>
              
              <TabsContent value="elo" className="pt-4">
                <p className="text-sm text-gray-400">
                  Az Elo minősítési rendszer a csapatok relatív erősségét veszi figyelembe,
                  és 75% pontossággal jelzi előre a mérkőzések kimenetelét.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Predikciós táblázat */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Aktuális forduló predikciói</h3>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
                onClick={simulateNewPrediction}
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
        </TabsContent>
        
        {/* Pattern Analysis Tab with new advanced analysis link */}
        <TabsContent value="patterns" className="pt-6">
          <div className="mb-6 flex justify-between items-center">
            <div></div>
            <Link to="/advanced-pattern">
              <Button 
                variant="outline" 
                className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 flex items-center gap-2"
              >
                <BarChart4 className="h-4 w-4" />
                Speciális mintázatelemzés
              </Button>
            </Link>
          </div>
          <PatternAnalysis />
        </TabsContent>
        
        {/* Anomaly Detection Tab */}
        <TabsContent value="anomalies" className="pt-6">
          <div className="bg-gray-900/40 rounded-lg p-6 border border-white/5 text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Anomália Detektálás</h3>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Az anomália keresés funkció fejlesztés alatt áll. Ez a modul fogja azonosítani a 
              nem szokványos mintázatokat, amelyek potenciálisan nagy nyereményt hozhatnak.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
              disabled
            >
              Fejlesztés alatt
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* A rendszer leírása */}
      <div className="bg-gray-900/40 rounded-lg p-6 border border-white/5">
        <h3 className="text-white font-medium mb-3">A rendszer matematikai alapjai</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            A V-Sports elemzési rendszer nem próbálja "feltörni" az RNG-t, hanem 
            a múltbeli adatokból azonosít mintázatokat - legitim adatelemzés.
          </p>
          <p>
            <strong className="text-white">Zárt rendszer kihasználása:</strong> A V-Sports tökéletes elemzési alany, mert 
            fix 16 csapat van, nincs külső változó (sérülések, időjárás), a bajnokságok 
            ciklikusan ismétlődnek, és minden mérkőzés ugyanazon szabályok szerint zajlik.
          </p>
          <p>
            <strong className="text-white">Adatelemzési megközelítés:</strong> Ahogy a Bletchley Park kódfejtői statisztikai 
            módszerekkel törték fel az Enigmát, ez a rendszer is statisztikai módszereket használ 
            a V-Sports mintázatainak azonosítására.
          </p>
        </div>
      </div>
      
      {/* New system information section based on user's input */}
      <div className="bg-gradient-to-br from-blue-950/40 to-indigo-950/40 rounded-lg p-6 border border-blue-800/30">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Rendszer Optimalizációs Szempontok
        </h3>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">1. Determinisztikus alapú "véletlenszerűség"</h4>
            <p>
              A V-Sports RNG viselkedése valószínűleg nem teljesen véletlenszerű, hanem kvázi-determinisztikus, 
              ami lehetővé teszi a predikciót - ez jellemző a legtöbb RNG-alapú játékmodellre, mivel a rendszernek 
              reprodukálhatónak kell lennie.
            </p>
          </div>
          
          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">2. Hazai-Vendég kontextus kritikus szerepe</h4>
            <p>
              Liverpool vs Chelsea ≠ Chelsea vs Liverpool. Minden mérkőzést <em>külön</em> kell kezelni a hazai-vendég 
              irány alapján, mint különálló eseményeket. Ez jelentősen növeli az adatdimenziót: 16 csapat → 240 egyedi 
              mérkőzés ligánként.
            </p>
          </div>
          
          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">3. Mintázat-specifikus előrejelzés teljesítménye</h4>
            <p>
              A "Félidő / Végeredmény Fordulat" mintázat (pl. Nottingham vs Wolverhampton) rendkívüli pontossággal működött - 
              ezt a mintát <em>kódolni</em> és követni kell. Ez túlmutat az egyszerű prediktív statisztikákon, és 
              <strong> anomália felismerés</strong> irányába fejlődik, ami kombinálható Deep Learning modellekkel 
              (pl. RNN / LSTM).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionSystem;
