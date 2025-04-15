
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, FilePlus, AlertCircle } from 'lucide-react';
import { PatternDefinition } from '../../types/match';
import { toast } from 'sonner';
import PatternDetailsView from './PatternDetailsView';

interface PatternsTabProps {
  patterns: PatternDefinition[];
  isMobile: boolean;
  handleRunAnalysis: () => void;
}

const PatternsTab: React.FC<PatternsTabProps> = ({ patterns, isMobile, handleRunAnalysis }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingPattern, setIsCreatingPattern] = useState(false);

  // Filtering patterns based on search term
  const filteredPatterns = patterns.filter(pattern =>
    pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePattern = () => {
    setIsCreatingPattern(true);
  };
  
  const handleSavePattern = () => {
    setIsCreatingPattern(false);
    toast.success("Minta sikeresen létrehozva", {
      description: "Az új minta mostantól elérhető az elemzési rendszerben."
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Minta Definíciók</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Keresés..." 
              className="pl-8 bg-black/20 border-white/10 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
            onClick={handleCreatePattern}
          >
            <FilePlus className="h-4 w-4" />
            <span>Új minta</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Név</TableHead>
                <TableHead className="text-gray-400 font-normal">Típus</TableHead>
                <TableHead className="text-gray-400 font-normal">Leírás</TableHead>
                <TableHead className="text-gray-400 font-normal">Létrehozva</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">Állapot</TableHead>
                <TableHead className="text-gray-400 font-normal"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatterns.map((pattern) => (
                <TableRow key={pattern.id} className="border-b border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{pattern.name}</TableCell>
                  <TableCell>
                    <Badge className={`
                      ${pattern.type === 'turnaround' ? 'bg-purple-500/80' : 
                        pattern.type === 'scoreline' ? 'bg-blue-500/80' : 
                        pattern.type === 'goals' ? 'bg-emerald-500/80' : 'bg-gray-500/80'}
                    `}>
                      {pattern.type === 'turnaround' ? 'Fordulat' : 
                       pattern.type === 'scoreline' ? 'Eredmény' : 
                       pattern.type === 'goals' ? 'Gól' : 'Egyedi'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{pattern.description}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(pattern.createdAt).toLocaleDateString('hu-HU')}
                  </TableCell>
                  <TableCell className="text-center">
                    {pattern.isActive ? 
                      <Badge className="bg-emerald-500/80">Aktív</Badge> : 
                      <Badge className="bg-gray-500/80">Inaktív</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <PatternDetailsView 
                      pattern={pattern} 
                      isMobile={isMobile} 
                      handleRunAnalysis={handleRunAnalysis}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Pattern Creation Dialog */}
      <Dialog open={isCreatingPattern} onOpenChange={setIsCreatingPattern}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Új minta létrehozása</DialogTitle>
            <DialogDescription>
              Határozzon meg egy új mintát, amelyet a rendszer keresni fog a mérkőzés adatokban.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Minta neve</label>
                <Input placeholder="pl. Második félidei fordulat" className="bg-black/20 border-white/10" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Minta leírása</label>
                <Input placeholder="pl. Mérkőzések, ahol a hazai csapat hátrányból fordít" className="bg-black/20 border-white/10" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Minta típusa</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20">
                    Fordulat
                  </Button>
                  <Button variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                    Eredmény
                  </Button>
                  <Button variant="outline" className="bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20">
                    Gól
                  </Button>
                  <Button variant="outline" className="bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20">
                    Egyedi
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-white">Feltételek</label>
                  <Button variant="ghost" size="sm" className="h-8 text-blue-400">
                    + Feltétel hozzáadása
                  </Button>
                </div>
                
                <div className="bg-black/20 rounded-md p-3 space-y-2">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-3">
                      <Input placeholder="Mező" className="bg-black/40 border-white/10" defaultValue="htHomeScore" />
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="Operátor" className="bg-black/40 border-white/10" defaultValue="&lt;" />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Érték" className="bg-black/40 border-white/10" defaultValue="htAwayScore" />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Logikai operátor" className="bg-black/40 border-white/10" defaultValue="AND" />
                    </div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-3">
                      <Input placeholder="Mező" className="bg-black/40 border-white/10" defaultValue="ftHomeScore" />
                    </div>
                    <div className="col-span-2">
                      <Input placeholder="Operátor" className="bg-black/40 border-white/10" defaultValue="&gt;" />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Érték" className="bg-black/40 border-white/10" defaultValue="ftAwayScore" />
                    </div>
                    <div className="col-span-3">
                      <Input placeholder="Logikai operátor" className="bg-black/40 border-white/10" />
                    </div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingPattern(false)}>Mégsem</Button>
            <Button onClick={handleSavePattern}>Mentés</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatternsTab;
