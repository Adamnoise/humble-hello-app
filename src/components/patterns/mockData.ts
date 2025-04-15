
import { DataSource, PatternDefinition, PatternDetectionResult } from '../../types/match';

// Sample data sources
export const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'Premier League 2024-2025',
    type: 'api',
    description: 'API feed for the current Premier League season',
    connection: { url: 'https://api.example.com/v1/premier-league/2024-2025' },
    lastSync: '2025-04-03T14:30:00',
    status: 'active',
    matches: 240
  },
  {
    id: '2',
    name: 'Historical Match Data',
    type: 'csv',
    description: 'Historical match data from previous 5 seasons',
    connection: { filename: 'historical_data.csv' },
    lastSync: '2025-04-01T09:15:00',
    status: 'active',
    matches: 1200
  },
  {
    id: '3',
    name: 'Betting Odds Database',
    type: 'database',
    description: 'SQL database with pre-match and in-play odds',
    connection: { host: 'db.example.com', database: 'betting_odds' },
    lastSync: '2025-04-04T08:00:00',
    status: 'active',
    matches: 960
  },
  {
    id: '4',
    name: 'Custom Observations',
    type: 'manual',
    description: 'Manually entered match observations',
    connection: null,
    lastSync: '2025-03-30T16:45:00',
    status: 'active',
    matches: 56
  }
];

// Sample predefined patterns
export const predefinedPatterns: PatternDefinition[] = [
  {
    id: 'p1',
    name: 'Draw to Away Win Turnaround',
    description: 'Matches where the result changes from a draw at half-time to an away win at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c1', field: 'htHomeScore', operator: '=', value: 'htAwayScore' },
      { id: 'c2', field: 'ftAwayScore', operator: '>', value: 'ftHomeScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-20T10:00:00',
    lastUpdated: '2025-04-01T14:30:00',
    isActive: true
  },
  {
    id: 'p2',
    name: 'Home Team Comeback',
    description: 'Home team trailing at half-time but wins at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c3', field: 'htHomeScore', operator: '<', value: 'htAwayScore' },
      { id: 'c4', field: 'ftHomeScore', operator: '>', value: 'ftAwayScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-22T11:15:00',
    lastUpdated: '2025-03-22T11:15:00',
    isActive: true
  },
  {
    id: 'p3',
    name: 'High-Scoring Second Half',
    description: 'Matches with 3+ goals in the second half',
    type: 'goals',
    conditions: [
      { 
        id: 'c5', 
        field: '(ftHomeScore - htHomeScore) + (ftAwayScore - htAwayScore)', 
        operator: '>=', 
        value: 3 
      }
    ],
    createdAt: '2025-03-25T09:30:00',
    lastUpdated: '2025-04-02T16:45:00',
    isActive: true
  }
];

// Sample pattern detection results
export const patternResults: PatternDetectionResult[] = [
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
