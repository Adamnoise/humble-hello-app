
import React from 'react';
import { Goal } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const BothTeamsScored = () => {
  const teams = [
    { pos: 1, id: '#1', team: 'Brentford', played: 30, bts: 20, rate: '66.7%' },
    { pos: 2, id: '#2', team: 'Chelsea', played:
 30, bts: 19, rate: '63.3%' },
    { pos: 3, id: '#3', team: 'London Ágyúk', played: 30, bts: 18, rate: '60.0%' },
    { pos: 4, id: '#4', team: 'Manchester Kék', played: 30, bts: 18, rate: '60.0%' },
    { pos: 5, id: '#5', team: 'Tottenham', played: 30, bts: 18, rate: '60.0%' },
    { pos: 6, id: '#6', team: 'Brighton', played: 30, bts: 17, rate: '56.7%' },
    { pos: 7, id: '#7', team: 'Newcastle', played: 30, bts: 17, rate: '56.7%' },
    { pos: 8, id: '#8', team: 'Vörös Ördögök', played: 30, bts: 15, rate: '50.0%' },
    { pos: 9, id: '#9', team: 'Crystal Palace', played: 30, bts: 13, rate: '43.3%' },
    { pos: 10, id: '#10', team: 'Fulham', played: 30, bts: 13, rate: '43.3%' },
    { pos: 11, id: '#11', team: 'Nottingham', played: 30, bts: 13, rate: '43.3%' },
    { pos: 12, id: '#12', team: 'Wolverhampton', played: 30, bts: 13, rate: '43.3%' },
    { pos: 13, id: '#13', team: 'Aston Oroszlán', played: 30, bts: 12, rate: '40.0%' },
    { pos: 14, id: '#14', team: 'Everton', played: 30, bts: 12, rate: '40.0%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Goal className="h-5 w-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-white">Both Teams Scored</h2>
        </div>
        <span className="text-sm text-gray-400">16 Teams</span>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Pos</TableHead>
              <TableHead className="text-gray-400 font-normal">Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Played</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">BTS</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow 
                key={team.id} 
                className="border-b border-white/5 hover:bg-white/5"
              >
                <TableCell className="text-blue-400 font-medium">{team.id}</TableCell>
                <TableCell className="text-white font-medium">{team.team}</TableCell>
                <TableCell className="text-center text-gray-300">{team.played}</TableCell>
                <TableCell className="text-center text-white font-medium">{team.bts}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${parseFloat(team.rate) >= 60 ? 'bg-blue-500' : 'bg-amber-500'}`}
                        style={{ width: team.rate }}
                      />
                    </div>
                    <span className="text-gray-300 text-sm">{team.rate}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BothTeamsScored;
