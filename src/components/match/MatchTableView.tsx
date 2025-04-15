
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  ht?: string;
  ft?: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

interface MatchTableViewProps {
  matches: Match[];
  isLoading: boolean;
  onMatchClick: (match: Match) => void;
}

const MatchTableView: React.FC<MatchTableViewProps> = ({ 
  matches, 
  isLoading, 
  onMatchClick 
}) => {
  return (
    <div className="bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-xs">R</span>
        </div>
        <h3 className="text-white font-medium">All Matches</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Date</TableHead>
              <TableHead className="text-gray-400 font-normal">Time</TableHead>
              <TableHead className="text-gray-400 font-normal">Status</TableHead>
              <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
              <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Score</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index} className="border-b border-white/5">
                  <TableCell><Skeleton className="h-4 w-16 bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12 bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-white/5" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32 bg-white/5" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-4 w-12 bg-white/5 mx-auto" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-8 w-8 bg-white/5 rounded-full mx-auto" /></TableCell>
                </TableRow>
              ))
            ) : matches.length > 0 ? (
              matches.map((match) => (
                <TableRow 
                  key={match.id} 
                  className={`border-b border-white/5 hover:bg-white/5 cursor-pointer ${
                    match.status === 'live' ? 'bg-red-500/5' : 
                    match.status === 'upcoming' ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => onMatchClick(match)}
                >
                  <TableCell className="text-gray-300">
                    {new Date(match.date).toLocaleDateString('hu-HU')}
                  </TableCell>
                  <TableCell className="text-gray-300">{match.time}</TableCell>
                  <TableCell>
                    {match.status === 'live' && (
                      <Badge className="bg-red-500 text-white">LIVE</Badge>
                    )}
                    {match.status === 'upcoming' && (
                      <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                    )}
                    {match.status === 'completed' && (
                      <Badge className="bg-green-500 text-white">Completed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-white font-medium">{match.homeTeam}</TableCell>
                  <TableCell className="text-white font-medium">{match.awayTeam}</TableCell>
                  <TableCell className="text-center">
                    {match.status === 'upcoming' ? (
                      <span className="text-gray-400">-</span>
                    ) : match.status === 'live' ? (
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold">{match.homeScore}</span>
                        <span>-</span>
                        <span className="font-bold">{match.awayScore}</span>
                        <Clock className="h-3 w-3 text-red-500 ml-1 animate-pulse" />
                      </div>
                    ) : (
                      <span className={`font-medium ${match.ft?.includes('0') ? 'text-emerald-500' : 'text-white'}`}>
                        {match.ft}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMatchClick(match);
                      }}
                    >
                      <Eye className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                  No matches found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MatchTableView;
