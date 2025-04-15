
import React from 'react';
import { BarChart4, ChevronUp, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const LeagueTable = () => {
  const teams = [
    { pos: 1, trend: 'up', team: 'Vörös Ördögök', p: 30, w: 19, d: 7, l: 4, gf: 57, ga: 22, gd: '+35', pts: 64, rating: 5 },
    { pos: 2, trend: 'same', team: 'Liverpool', p: 30, w: 19, d: 4, l: 7, gf: 54, ga: 28, gd: '+26', pts: 61, rating: 4 },
    { pos: 3, trend: 'up', team: 'Tottenham', p: 30, w: 18, d: 7, l: 5, gf: 56, ga: 33, gd: '+23', pts: 61, rating: 4 },
    { pos: 4, trend: 'up', team: 'Manchester Kék', p: 30, w: 17, d: 8, l: 5, gf: 58, ga: 28, gd: '+30', pts: 59, rating: 4 },
    { pos: 5, trend: 'down', team: 'Chelsea', p: 30, w: 17, d: 7, l: 6, gf: 57, ga: 34, gd: '+23', pts: 58, rating: 5 },
    { pos: 6, trend: 'up', team: 'Everton', p: 30, w: 13, d: 9, l: 8, gf: 38, ga: 25, gd: '+13', pts: 48, rating: 4 },
    { pos: 7, trend: 'down', team: 'Wolverhampton', p: 30, w: 11, d: 7, l: 12, gf: 35, ga: 36, gd: '-1', pts: 40, rating: 4 },
    { pos: 8, trend: 'up', team: 'Fulham', p: 30, w: 9, d: 11, l: 10, gf: 26, ga: 29, gd: '-3', pts: 38, rating: 4 },
    { pos: 9, trend: 'down', team: 'Brentford', p: 30, w: 9, d: 9, l: 12, gf: 36, ga: 42, gd: '-6', pts: 36, rating: 5 },
    { pos: 10, trend: 'down', team: 'Aston Oroszlán', p: 30, w: 11, d: 2, l: 17, gf: 29, ga: 46, gd: '-17', pts: 35, rating: 2 },
    { pos: 11, trend: 'up', team: 'Newcastle', p: 30, w: 9, d: 6, l: 15, gf: 37, ga: 44, gd: '-7', pts: 33, rating: 5 },
    { pos: 12, trend: 'down', team: 'Nottingham', p: 30, w: 9, d: 5, l: 16, gf: 31, ga: 41, gd: '-10', pts: 32, rating: 5 },
    { pos: 13, trend: 'down', team: 'West Ham', p: 30, w: 9, d: 1, l: 20, gf: 24, ga: 66, gd: '-42', pts: 28, rating: 5 },
    { pos: 14, trend: 'down', team: 'London Ágyúk', p: 30, w: 7, d: 6, l: 17, gf: 37, ga: 51, gd: '-14', pts: 27, rating: 3 },
    { pos: 15, trend: 'down', team: 'Crystal Palace', p: 30, w: 7, d: 5, l: 18, gf: 24, ga: 46, gd: '-22', pts: 26, rating: 5 }
  ];

  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span 
        key={i} 
        className={`inline-block w-2 h-2 rounded-full mx-0.5 ${i < rating ? 'bg-emerald-500' : 'bg-red-500'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <BarChart4 className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Standings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal w-10">Pos</TableHead>
              <TableHead className="text-gray-400 font-normal">Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">P</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">W</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">D</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">L</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">GF</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">GA</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">GD</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Pts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow 
                key={team.pos} 
                className="border-b border-white/5 hover:bg-white/5"
              >
                <TableCell className="flex items-center gap-1">
                  {team.pos}
                  {team.trend === 'up' && <ChevronUp className="w-3 h-3 text-emerald-500" />}
                  {team.trend === 'down' && <ChevronDown className="w-3 h-3 text-red-500" />}
                  {team.trend === 'same' && <span className="w-3 h-3 inline-block" />}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="flex">
                    {renderRating(team.rating)}
                  </div>
                  <span className="text-white font-medium">{team.team}</span>
                </TableCell>
                <TableCell className="text-center text-gray-300">{team.p}</TableCell>
                <TableCell className="text-center text-emerald-500 font-medium">{team.w}</TableCell>
                <TableCell className="text-center text-amber-500 font-medium">{team.d}</TableCell>
                <TableCell className="text-center text-red-500 font-medium">{team.l}</TableCell>
                <TableCell className="text-center text-gray-300">{team.gf}</TableCell>
                <TableCell className="text-center text-gray-300">{team.ga}</TableCell>
                <TableCell className={`text-center font-medium ${
                  team.gd.startsWith('+') ? 'text-emerald-500' : team.gd.startsWith('-') ? 'text-red-500' : 'text-gray-300'
                }`}>{team.gd}</TableCell>
                <TableCell className="text-center text-white font-bold">{team.pts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
