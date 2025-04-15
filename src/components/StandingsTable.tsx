
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy } from 'lucide-react';
import type { TeamStanding, LeagueConfiguration } from "../types/league";

interface StandingsTableProps {
  standings: TeamStanding[];
  configuration?: LeagueConfiguration;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ standings, configuration }) => {
  const promotionSpots = configuration?.promotionSpots || 3;
  const relegationSpots = configuration?.relegationSpots || 3;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-400" />
        <h2 className="text-lg font-medium text-white">League Standings</h2>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="w-12 text-gray-400 font-normal">Pos</TableHead>
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
            {standings.length > 0 ? (
              standings.map((team, index) => (
                <TableRow 
                  key={index} 
                  className={`border-b border-white/10 hover:bg-white/5 ${
                    index < promotionSpots ? 'bg-blue-500/10' : 
                    standings.length - index <= relegationSpots ? 'bg-red-500/10' : ''
                  }`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/30 text-sm">
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-white">{team.team}</TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center text-green-400">{team.won}</TableCell>
                  <TableCell className="text-center text-amber-400">{team.drawn}</TableCell>
                  <TableCell className="text-center text-red-400">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className={`text-center ${
                    team.goalDifference > 0 ? 'text-green-400' : 
                    team.goalDifference < 0 ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-gray-400 py-8">
                  No standings data available. Make sure you've uploaded match data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
