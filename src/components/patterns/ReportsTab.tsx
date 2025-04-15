
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle, Bell } from 'lucide-react';
import { PatternDetectionResult, DataSource } from '../../types/match';

interface ReportsTabProps {
  patternResults: PatternDetectionResult[];
  dataSources: DataSource[];
  handleExportReport: () => void;
  handleRunAnalysis: () => void;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ 
  patternResults, 
  dataSources, 
  handleExportReport,
  handleRunAnalysis 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Elemzési jelentések</h3>
        <Button 
          variant="outline" 
          className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 flex items-center gap-1"
          onClick={handleExportReport}
        >
          <Download className="h-4 w-4" />
          <span>Exportálás</span>
        </Button>
      </div>
      
      <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
        {patternResults.length > 0 ? (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h4 className="text-white font-medium mb-3">Összefoglaló</h4>
              <p className="text-gray-300 text-sm">
                Az elemzés során összesen {patternResults.length} mintát vizsgáltunk {dataSources.reduce((sum, source) => sum + source.matches, 0)} mérkőzés adatain.
                A legjelentősebb eredményeket az alábbi jelentésben foglaltuk össze.
              </p>
            </div>
            
            <div className="border-b border-white/10 pb-4">
              <h4 className="text-white font-medium mb-3">Kiemelt megállapítások</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    A "Draw to Away Win Turnaround" minta 24.6%-os előfordulással jelentkezik, és 
                    81.5%-os megbízhatósággal jelezhető előre.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    A hazai pályán történő fordítások 18.2%-os gyakorisággal fordulnak elő, 
                    és erősen korrelálnak a korai cserékkel és az erős kispad jelenlétével.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    A V-Sports rendszerben a fordulati események konzisztens mintázatot mutatnak, 
                    ami megerősíti a kvázi-determinisztikus RNG feltételezést.
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Javasolt intézkedések</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-md border border-white/5">
                  <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-400" />
                    Fordulat figyelő riasztások beállítása
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Állítson be automatikus értesítéseket, amikor egy mérkőzés a "Draw to Away Win"
                    minta feltételeit mutatja élőben.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-black/10 border-white/10">
                    Beállítás
                  </Button>
                </div>
                
                <div className="bg-black/20 p-3 rounded-md border border-white/5">
                  <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    Részletes jelentés létrehozása
                  </h5>
                  <p className="text-gray-400 text-sm">
                    Készítsen részletes PDF jelentést az összes feltárt mintáról és azok 
                    statisztikai elemzéséről.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-black/10 border-white/10">
                    Létrehozás
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <h5 className="text-white font-medium mb-2">Még nincs elemzési jelentés</h5>
            <p className="text-gray-400 text-sm mb-4">
              Az elemzési jelentések az elemzés futtatása után lesznek elérhetők
            </p>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleRunAnalysis}
            >
              Elemzés indítása
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReportsTab;
