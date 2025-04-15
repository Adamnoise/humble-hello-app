
import React from 'react';
import { Search, Plus, Eye, Edit, Trash, CheckCircle, Clock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LeagueSeasons = ({ onEdit }) => {
  const leagues = [
    { 
      season: '2023-2024', 
      winner: 'Vörös Ördögök', 
      secondPlace: 'Liverpool', 
      thirdPlace: 'Tottenham', 
      status: 'completed' 
    },
    { 
      season: '2023-2024', 
      winner: '-', 
      secondPlace: '-', 
      thirdPlace: '-', 
      status: 'in-progress' 
    }
  ];

  return (
    <Card className="border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="search" 
              placeholder="Search leagues..." 
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New League
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/20">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Season</TableHead>
                <TableHead className="text-gray-400 font-normal">Winner</TableHead>
                <TableHead className="text-gray-400 font-normal">Second Place</TableHead>
                <TableHead className="text-gray-400 font-normal">Third Place</TableHead>
                <TableHead className="text-gray-400 font-normal">Status</TableHead>
                <TableHead className="text-gray-400 font-normal text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagues.map((league, index) => (
                <TableRow 
                  key={index} 
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <TableCell className="text-white">{league.season}</TableCell>
                  <TableCell className="text-white">{league.winner}</TableCell>
                  <TableCell className="text-white">{league.secondPlace}</TableCell>
                  <TableCell className="text-white">{league.thirdPlace}</TableCell>
                  <TableCell>
                    {league.status === 'completed' ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-500 text-sm">Completed</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-blue-500/20 px-2 py-0.5 rounded-full">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className="text-blue-400 text-xs">In Progress</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-8 h-8 bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4 text-gray-300" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-8 h-8 bg-white/5 border-white/10 hover:bg-white/10"
                        onClick={onEdit}
                      >
                        <Edit className="h-4 w-4 text-gray-300" />
                      </Button>
                      {league.status === 'in-progress' && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-8 h-8 bg-white/5 border-white/10 hover:bg-white/10"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-8 h-8 bg-white/5 border-white/10 hover:bg-white/10"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default LeagueSeasons;
