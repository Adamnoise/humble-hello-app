
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TeamForm } from "../types/league";

interface FormTableProps {
  teamForms: TeamForm[];
}

export const FormTable: React.FC<FormTableProps> = ({ teamForms }) => {
  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-emerald-500';
      case 'D': return 'bg-amber-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-700';
    }
  };

  // Pattern detection
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

  // Pattern description
  const getPatternDescription = (history: string) => {
    if ((history.match(/WWW/g) || []).length > 0) return "Win streak";
    if ((history.match(/LLL/g) || []).length > 0) return "Loss streak";
    if ((history.match(/DDD/g) || []).length > 0) return "Draw streak";
    if ((history.match(/[WL][WL][WL]/g) || []).length > 0) return "Inconsistent";
    if ((history.match(/[WD][WD][WD][WD]/g) || []).length > 0) return "Reliable";
    return "";
  };

  // Calculate form trend (are they improving or declining?)
  const getFormTrend = (form: ('W' | 'D' | 'L')[]) => {
    if (form.length < 4) return 'neutral';
    
    const recentPoints = form.slice(0, 2).reduce(
      (total, result) => total + (result === 'W' ? 3 : result === 'D' ? 1 : 0), 
      0
    );
    
    const olderPoints = form.slice(2, 4).reduce(
      (total, result) => total + (result === 'W' ? 3 : result === 'D' ? 1 : 0),
      0
    );
    
    if (recentPoints > olderPoints) return 'improving';
    if (recentPoints < olderPoints) return 'declining';
    return 'neutral';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-white" />
        <h2 className="text-lg font-medium text-white">Team Form</h2>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-gray-400 font-normal">Pos</TableHead>
              <TableHead className="text-gray-400 font-normal">Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Last 5</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Trend</TableHead>
              <TableHead className="text-gray-400 font-normal">Pattern</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamForms.length > 0 ? (
              teamForms.map((team, index) => (
                <TableRow 
                  key={index} 
                  className={`border-b border-white/10 hover:bg-white/5 ${
                    hasPattern(team.history) ? 'bg-blue-500/5' : ''
                  }`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/30 text-sm">
                      {team.position}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-white">{team.team}</TableCell>
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
                                {result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getFormTrend(team.form) === 'improving' && (
                      <div className="flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                    {getFormTrend(team.form) === 'declining' && (
                      <div className="flex items-center justify-center">
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                    {getFormTrend(team.form) === 'neutral' && (
                      <div className="text-gray-400">-</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {hasPattern(team.history) ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1">
                              <span>{getPatternDescription(team.history)}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-xs">
                            <p className="text-xs text-gray-300">
                              A pattern has been detected in the team's recent performance.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-gray-500 text-xs">No pattern detected</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                  No form data available. Make sure you've uploaded match data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
