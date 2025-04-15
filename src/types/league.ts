
export interface Match {
  date: string;
  home_team: string;
  away_team: string;
  ht_home_score: number;
  ht_away_score: number;
  home_score: number;
  away_score: number;
  round?: string;
}

export interface LeagueData {
  id?: string;
  name: string;
  season: string;
  status?: 'completed' | 'in-progress';
  configuration?: LeagueConfiguration;
  teams?: string[];
}

export interface LeagueConfiguration {
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  matchesPerTeam?: number;
  promotionSpots?: number;
  relegationSpots?: number;
  tiebreakers?: ('goalDifference' | 'goalsFor' | 'headToHead')[];
}

export interface TeamStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TeamForm {
  team: string;
  form: ('W' | 'D' | 'L')[];
  history: string;
  position: number;
}

export interface LeagueStats {
  totalMatches: number;
  totalGoals: number;
  avgGoalsPerMatch: number;
  mostGoalsTeam: string;
  leastGoalsTeam: string;
  homeWinPercentage: number;
  awayWinPercentage: number;
  drawPercentage: number;
}
