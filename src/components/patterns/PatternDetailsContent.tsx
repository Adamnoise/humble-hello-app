
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  PatternDefinition, 
  PatternDetectionResult
} from '../../types/match';

interface PatternDetailsContentProps {
  pattern: PatternDefinition;
}

const PatternDetailsContent: React.FC<PatternDetailsContentProps> = ({ pattern }) => {
  const patternResults = getPatternResultsForPattern(pattern.id);

  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'high':
        return <Badge className="bg-emerald-500">Magas jelentőség</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Közepes jelentőség</Badge>;
      case 'low':
        return <Badge className="bg-gray-500">Alacsony jelentőség</Badge>;
      default:
        return <Badge className="bg-gray-500">{significance}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Minta feltételek:</h4>
        <div className="bg-black/20 rounded-md p-3 space-y-2">
          {pattern.conditions.map((condition, idx) => (
            <div key={condition.id} className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400">{condition.field}</Badge>
              <span className="text-gray-400">{condition.operator}</span>
              <Badge className="bg-purple-500/20 text-purple-400">{condition.value}</Badge>
              {condition.logicalOperator && (
                <span className="text-gray-400 font-bold">{condition.logicalOperator}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {patternResults.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Korábbi elemzési eredmények:</h4>
          <div className="bg-black/20 rounded-md p-3">
            {patternResults.map(result => (
              <div key={result.patternId} className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-black/30 rounded-md">
                    <div className="text-xs text-gray-400">Gyakoriság</div>
                    <div className="text-lg font-bold text-white">{result.frequency}%</div>
                  </div>
                  <div className="p-2 bg-black/30 rounded-md">
                    <div className="text-xs text-gray-400">Megbízhatóság</div>
                    <div className="text-lg font-bold text-emerald-400">{result.confidenceScore}%</div>
                  </div>
                  <div className="p-2 bg-black/30 rounded-md">
                    <div className="text-xs text-gray-400">Jelentőség</div>
                    <div>{getSignificanceBadge(result.significance)}</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-white">Elemzési meglátások:</h5>
                  <ul className="text-xs text-gray-300 space-y-1 list-disc pl-5">
                    {result.insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get pattern results for a specific pattern
function getPatternResultsForPattern(patternId: string): PatternDetectionResult[] {
  // This would normally fetch from a data source or context
  // For now, we're using sample data
  const results: PatternDetectionResult[] = [
    {
      patternId: 'p1',
      patternName: 'Draw to Away Win Turnaround',
      matches: [
        {
          matchId: 123,
          homeTeam: 'Nottingham',
          awayTeam: 'Wolverhampton',
          date: '2025-03-15',
          league: 'Premier League',
          pattern: {
            htHomeScore: 0,
            htAwayScore: 0,
            ftHomeScore: 0,
            ftAwayScore: 2
          },
          confidenceScore: 86
        },
        {
          matchId: 456,
          homeTeam: 'Brentford',
          awayTeam: 'Brighton',
          date: '2025-04-01',
          league: 'Premier League',
          pattern: {
            htHomeScore: 0,
            htAwayScore: 0,
            ftHomeScore: 0,
            ftAwayScore: 2
          },
          confidenceScore: 77
        }
      ],
      frequency: 24.6,
      confidenceScore: 81.5,
      significance: 'high',
      insights: [
        'This pattern occurs most frequently in matches where the home team has poor second-half defensive stats',
        'The away teams in these matches typically have strong counterattacking ability'
      ]
    },
    {
      patternId: 'p2',
      patternName: 'Home Team Comeback',
      matches: [
        {
          matchId: 789,
          homeTeam: 'Chelsea',
          awayTeam: 'London Ágyúk',
          date: '2025-03-20',
          league: 'Premier League',
          pattern: {
            htHomeScore: 0,
            htAwayScore: 1,
            ftHomeScore: 2,
            ftAwayScore: 1
          },
          confidenceScore: 74
        }
      ],
      frequency: 18.2,
      confidenceScore: 74,
      significance: 'medium',
      insights: [
        'Home comebacks are more common in matches where the home team makes early substitutions',
        'Teams with strong bench strength show this pattern more consistently'
      ]
    }
  ];
  
  return results.filter(result => result.patternId === patternId);
}

export default PatternDetailsContent;
