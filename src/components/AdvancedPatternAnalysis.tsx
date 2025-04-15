
import React, { useState, useCallback, useEffect } from 'react';
import { Database } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { dataSources, predefinedPatterns, patternResults } from './patterns/mockData';
import DataSourcesTab from './patterns/DataSourcesTab';
import PatternsTab from './patterns/PatternsTab';
import AnalysisTab from './patterns/AnalysisTab';
import ReportsTab from './patterns/ReportsTab';

const AdvancedPatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('patterns');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleImportData = useCallback(() => {
    toast.success("Adatimport kezdeményezve", {
      description: "Az adatok feldolgozása megkezdődött, az eredményekről értesítést kap."
    });
  }, []);
  
  const handleRunAnalysis = useCallback(() => {
    toast.success("Elemzés elindítva", {
      description: "Az eredmények hamarosan elérhetők lesznek."
    });
  }, []);
  
  const handleExportReport = useCallback(() => {
    toast.success("Jelentés exportálása", {
      description: "A jelentés letöltése hamarosan elindul."
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-bold text-white">Minta Elemzési Rendszer</h2>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black/20 w-full grid grid-cols-4">
          <TabsTrigger value="datasources" className="data-[state=active]:bg-blue-500/20">
            Adatforrások
          </TabsTrigger>
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-500/20">
            Minták
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500/20">
            Elemzés
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-blue-500/20">
            Jelentések
          </TabsTrigger>
        </TabsList>
        
        {/* Data Sources Tab */}
        <TabsContent value="datasources" className="pt-4">
          <DataSourcesTab 
            dataSources={dataSources} 
            handleImportData={handleImportData} 
          />
        </TabsContent>
        
        {/* Patterns Tab */}
        <TabsContent value="patterns" className="pt-4">
          <PatternsTab 
            patterns={predefinedPatterns} 
            isMobile={isMobile} 
            handleRunAnalysis={handleRunAnalysis} 
          />
        </TabsContent>
        
        {/* Analysis Tab */}
        <TabsContent value="analysis" className="pt-4">
          <AnalysisTab 
            dataSources={dataSources}
            predefinedPatterns={predefinedPatterns}
            patternResults={patternResults}
            handleRunAnalysis={handleRunAnalysis}
            handleExportReport={handleExportReport}
          />
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="pt-4">
          <ReportsTab 
            patternResults={patternResults}
            dataSources={dataSources}
            handleExportReport={handleExportReport}
            handleRunAnalysis={handleRunAnalysis}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPatternAnalysis;
