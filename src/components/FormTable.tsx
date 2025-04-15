
import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, Info, Search } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const FormTable = () => {
  const [teams, setTeams] = useState([
    { team: 'Vörös Ördögök', form: ['W', 'W', 'D', 'L', 'W'], history: 'WWDLWWDLLWWWDLWWW', position: 1 },
    { team: 'Liverpool', form: ['D', 'W', 'D', 'L', 'W'], history: 'DWDLWWWDWLLWDWWDW', position: 2 },
    { team: 'Tottenham', form: ['D', 'D', 'D', 'W', 'L'], history: 'DDDWLWDLLWDWWDDD', position: 3 },
    { team: 'Manchester Kék', form: ['W', 'D', 'D', 'W', 'L'], history: 'WDDWLWWDWLLWDWWW', position: 4 },
    { team: 'Chelsea', form: ['D', 'W', 'W', 'W', 'W'], history: 'DWWWWWWDLWWWDLWW', position: 5 },
    { team: 'Everton', form: ['L', 'D', 'D', 'W', 'D'], history: 'LDDWDDWDWLLWDDWL', position: 6 },
    { team: 'Wolverhampton', form: ['D', 'D', 'L', 'W', 'W'], history: 'DDLWWDWDLWLDWWW', position: 7 },
    { team: 'London Ágyúk', form: ['L', 'L', 'W', 'D', 'D'], history: 'LLWDDWLLLDDWDWL', position: 8 },
    { team: 'Crystal Palace', form: ['W', 'D', 'L', 'L', 'W'], history: 'WDLLWDDWLWLDLWW', position: 9 },
    { team: 'Aston Oroszlán', form: ['D', 'W', 'W', 'L', 'D'], history: 'DWWLDDWLLWDDLWW', position: 10 },
    { team: 'Newcastle', form: ['L', 'D', 'W', 'W', 'D'], history: 'LDWWDDLLLWDWLWW', position: 11 },
    { team: 'Brentford', form: ['W', 'W', 'L', 'D', 'W'], history: 'WWLDWDWDLWLWWWL', position: 12 },
    { team: 'West Ham', form: ['D', 'L', 'D', 'W', 'L'], history: 'DLDWLLLDDWDWLWL', position: 13 },
    { team: 'Nottingham', form: ['L', 'W', 'D', 'D', 'L'], history: 'LWDDLLWDLWLDLWL', position: 14 },
    { team: 'Fulham', form: ['W', 'D', 'L', 'W', 'D'], history: 'WDLWDWDLLWDWLWD', position: 15 },
  ]);

  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'}>({
    key: 'position',
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-emerald-500';
      case 'D': return 'bg-amber-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-700';
    }
  };

  // Pattern detection - enhanced with more patterns
  const hasPattern = (history: string) => {
    // Check for multiple patterns
    const patterns = {
      winStreak: (history.match(/WWW/g) || []).length > 0, // 3 or more consecutive wins
      lossStreak: (history.match(/LLL/g) || []).length > 0, // 3 or more consecutive losses
      drawStreak: (history.match(/DDD/g) || []).length > 0, // 3 or more consecutive draws
      inconsistent: (history.match(/[WL][WL][WL]/g) || []).length > 0, // Alternating wins and losses
      reliable: (history.match(/[WD][WD][WD][WD]/g) || []).length > 0, // Consistent not-losing (W or D)
    };

    return Object.values(patterns).some(Boolean);
  };

  // Pattern description - provides more detail about the pattern
  const getPatternDescription = (history: string) => {
    if ((history.match(/WWW/g) || []).length > 0) return "Win streak";
    if ((history.match(/LLL/g) || []).length > 0) return "Loss streak";
    if ((history.match(/DDD/g) || []).length > 0) return "Draw streak";
    if ((history.match(/[WL][WL][WL]/g) || []).length > 0) return "Inconsistent";
    if ((history.match(/[WD][WD][WD][WD]/g) || []).length > 0) return "Reliable";
    return "";
  };

  // Calculate form points (W=3, D=1, L=0)
  const calculateFormPoints = (form: string[]) => {
    return form.reduce((total, result) => {
      switch (result) {
        case 'W': return total + 3;
        case 'D': return total + 1;
        default: return total;
      }
    }, 0);
  };

  // Sorting function
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedTeams = [...teams]
    .filter(team => team.team.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortConfig.key === 'team') {
        return sortConfig.direction === 'asc' 
          ? a.team.localeCompare(b.team)
          : b.team.localeCompare(a.team);
      }
      if (sortConfig.key === 'form') {
        const aPoints = calculateFormPoints(a.form);
        const bPoints = calculateFormPoints(b.form);
        return sortConfig.direction === 'asc' ? aPoints - bPoints : bPoints - aPoints;
      }
      if (sortConfig.key === 'position') {
        return sortConfig.direction === 'asc' ? a.position - b.position : b.position - a.position;
      }
      return 0;
    });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Csapatok Formája és Mintázatok</h2>
      </div>
      
      <p className="text-gray-400 text-sm">
        Az alábbi táblázat a csapatok legutóbbi formáját mutatja, valamint azonosítja azokat a csapatokat, 
        amelyeknél ismétlődő mintázatokat találtunk a történelmi adatokban.
      </p>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Keresés csapatra..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Rendezés:</span>
          <Button 
            variant="outline" 
            className="bg-black/20 border-white/10 text-white text-sm flex items-center gap-2"
            onClick={() => requestSort('position')}
          >
            Helyezés
            {sortConfig.key === 'position' && (
              sortConfig.direction === 'asc' ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="outline" 
            className="bg-black/20 border-white/10 text-white text-sm flex items-center gap-2"
            onClick={() => requestSort('team')}
          >
            Csapat
            {sortConfig.key === 'team' && (
              sortConfig.direction === 'asc' ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="outline" 
            className="bg-black/20 border-white/10 text-white text-sm flex items-center gap-2"
            onClick={() => requestSort('form')}
          >
            Forma
            {sortConfig.key === 'form' && (
              sortConfig.direction === 'asc' ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Helyezés</TableHead>
              <TableHead className="text-gray-400 font-normal">Csapat</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Utolsó 5</TableHead>
              <TableHead className="text-gray-400 font-normal">Történelmi adatok</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Mintázat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => (
              <TableRow 
                key={index} 
                className={`border-b border-white/5 hover:bg-white/5 ${hasPattern(team.history) ? 'bg-blue-500/5' : ''}`}
              >
                <TableCell className="text-white font-medium">{team.position}</TableCell>
                <TableCell className="text-white font-medium">{team.team}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {team.form.map((result, idx) => (
                      <TooltipProvider key={idx}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${getFormColor(result)}`}
                            >
                              <span className="text-white text-xs font-bold">{result}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <div className="text-xs">
                              {result === 'W' ? 'Győzelem' : result === 'D' ? 'Döntetlen' : 'Vereség'}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {team.history.split('').map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`w-4 h-4 rounded-sm flex items-center justify-center ${getFormColor(result)}`}
                      >
                        <span className="text-white text-[8px] font-bold">{result}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {hasPattern(team.history) ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            <span>Mintázat észlelve</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div>
                            <p className="font-medium mb-1">{getPatternDescription(team.history)}</p>
                            <p className="text-xs text-gray-300">
                              A mintázatelemzésünk egy ismétlődő trendet azonosított a csapat teljesítményében.
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-gray-500 text-xs">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormTable;
