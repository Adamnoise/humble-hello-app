
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ModelSelectorProps {
  activeModel: string;
  setActiveModel: (model: string) => void;
}

const ModelSelector = ({ activeModel, setActiveModel }: ModelSelectorProps) => {
  return (
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
  );
};

export default ModelSelector;
