
import React, { useMemo } from 'react';
import { BarChart, Activity, Users, Goal } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Match, LeagueStats } from "../types/league";

interface LeagueStatisticsProps {
  matches: Match[];
}

export const LeagueStatistics: React.FC<LeagueStatisticsProps> = ({ matches }) => {
  const stats = useMemo(() => {
    if (!matches.length) {
      return null;
    }

    let totalGoals = 0;
    const teamGoals: Record<string, { for: number; against: number }> = {};
    let homeWins = 0;
    let awayWins = 0;
    let draws = 0;

    matches.forEach(match => {
      // Initialize team records if they don't exist
      if (!teamGoals[match.home_team]) {
        teamGoals[match.home_team] = { for: 0, against: 0 };
      }
      if (!teamGoals[match.away_team]) {
        teamGoals[match.away_team] = { for: 0, against: 0 };
      }

      // Add goals
      totalGoals += match.home_score + match.away_score;
      teamGoals[match.home_team].for += match.home_score;
      teamGoals[match.home_team].against += match.away_score;
      teamGoals[match.away_team].for += match.away_score;
      teamGoals[match.away_team].against += match.home_score;

      // Count results
      if (match.home_score > match.away_score) {
        homeWins++;
      } else if (match.home_score < match.away_score) {
        awayWins++;
      } else {
        draws++;
      }
    });

    // Find teams with most and least goals
    let mostGoalsTeam = '';
    let leastGoalsTeam = '';
    let maxGoals = -1;
    let minGoals = Number.MAX_SAFE_INTEGER;

    Object.entries(teamGoals).forEach(([team, goals]) => {
      if (goals.for > maxGoals) {
        maxGoals = goals.for;
        mostGoalsTeam = team;
      }
      if (goals.for < minGoals) {
        minGoals = goals.for;
        leastGoalsTeam = team;
      }
    });

    return {
      totalMatches: matches.length,
      totalGoals,
      avgGoalsPerMatch: totalGoals / matches.length,
      mostGoalsTeam,
      leastGoalsTeam,
      homeWinPercentage: (homeWins / matches.length) * 100,
      awayWinPercentage: (awayWins / matches.length) * 100,
      drawPercentage: (draws / matches.length) * 100,
    } as LeagueStats;
  }, [matches]);

  if (!stats) {
    return (
      <div className="text-center py-12 text-gray-400">
        No match data available to generate statistics
      </div>
    );
  }

  // Top scorers (by teams)
  const topScorers = useMemo(() => {
    const teams: Record<string, number> = {};
    
    matches.forEach(match => {
      if (!teams[match.home_team]) teams[match.home_team] = 0;
      if (!teams[match.away_team]) teams[match.away_team] = 0;
      
      teams[match.home_team] += match.home_score;
      teams[match.away_team] += match.away_score;
    });
    
    return Object.entries(teams)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([team, goals]) => ({ team, goals }));
  }, [matches]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart className="h-5 w-5 text-blue-400" />
        <h2 className="text-lg font-medium text-white">League Statistics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Total Matches</div>
            <div className="text-3xl font-bold text-white">{stats.totalMatches}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Total Goals</div>
            <div className="text-3xl font-bold text-white">{stats.totalGoals}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Avg Goals per Match</div>
            <div className="text-3xl font-bold text-white">
              {stats.avgGoalsPerMatch.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Top Scoring Team</div>
            <div className="text-xl font-bold text-white">{stats.mostGoalsTeam}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                Match Outcomes
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Home Wins</span>
                  <span className="text-white">{stats.homeWinPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stats.homeWinPercentage} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Away Wins</span>
                  <span className="text-white">{stats.awayWinPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stats.awayWinPercentage} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Draws</span>
                  <span className="text-white">{stats.drawPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={stats.drawPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-white flex items-center gap-2">
                <Goal className="h-4 w-4 text-blue-400" />
                Top Scoring Teams
              </h3>
            </div>
            
            <div className="space-y-3">
              {topScorers.map((scorer, index) => {
                // Calculate percentage for progress bar (relative to top scorer's goals)
                const percentage = (scorer.goals / topScorers[0].goals) * 100;
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{scorer.team}</span>
                      <span className="text-gray-400">{scorer.goals} goals</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
