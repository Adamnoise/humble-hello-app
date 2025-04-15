
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";
import { Loader2 } from 'lucide-react';
import MatchSchedule from '@/components/MatchSchedule';
import LeagueTable from '@/components/LeagueTable';
import FormTable from '@/components/FormTable';
import BothTeamsScored from '@/components/BothTeamsScored';
import PredictionSystem from '@/components/PredictionSystem';

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab, isLoading }) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <RovingFocusGroup asChild orientation="horizontal">
          <TabsList className="grid grid-cols-5 bg-muted/50 w-full rounded-none">
            <TabsTrigger 
              value="matches" 
              className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
            >
              Mérkőzések
            </TabsTrigger>
            <TabsTrigger 
              value="standings" 
              className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
            >
              Tabella
            </TabsTrigger>
            <TabsTrigger 
              value="form" 
              className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
            >
              Forma
            </TabsTrigger>
            <TabsTrigger 
              value="bts" 
              className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
            >
              Gólok
            </TabsTrigger>
            <TabsTrigger 
              value="prediction" 
              className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
            >
              Elemzés
            </TabsTrigger>
          </TabsList>
        </RovingFocusGroup>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Adatok betöltése...</h3>
            <p className="text-gray-400 text-center max-w-md">
              A mérkőzés adatok frissítése és elemzése folyamatban van. Ez néhány másodpercet vehet igénybe.
            </p>
          </div>
        )}
        
        {!isLoading && (
          <>
            <TabsContent value="matches" className="p-0 mt-0">
              <MatchSchedule />
            </TabsContent>
            
            <TabsContent value="standings" className="p-0 mt-0">
              <LeagueTable />
            </TabsContent>
            
            <TabsContent value="form" className="p-0 mt-0">
              <FormTable />
            </TabsContent>
            
            <TabsContent value="bts" className="p-0 mt-0">
              <BothTeamsScored />
            </TabsContent>
            
            <TabsContent value="prediction" className="p-0 mt-0">
              <PredictionSystem />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ContentTabs;
