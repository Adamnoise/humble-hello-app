
import { Match, TeamStanding, TeamForm, LeagueConfiguration } from "../types/league";

export const calculateStandings = (
  matches: Match[], 
  configuration?: LeagueConfiguration
): TeamStanding[] => {
  const pointsForWin = configuration?.pointsForWin ?? 3;
  const pointsForDraw = configuration?.pointsForDraw ?? 1;
  const pointsForLoss = configuration?.pointsForLoss ?? 0;
  
  const standings: Record<string, TeamStanding> = {};

  matches.forEach(match => {
    // Initialize team records if they don't exist
    if (!standings[match.home_team]) {
      standings[match.home_team] = {
        team: match.home_team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    }
    
    if (!standings[match.away_team]) {
      standings[match.away_team] = {
        team: match.away_team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    }

    // Skip if the match doesn't have final scores
    if (match.home_score === undefined || match.away_score === undefined) return;

    // Update home team stats
    const homeTeam = standings[match.home_team];
    homeTeam.played += 1;
    homeTeam.goalsFor += match.home_score;
    homeTeam.goalsAgainst += match.away_score;
    
    if (match.home_score > match.away_score) {
      homeTeam.won += 1;
      homeTeam.points += pointsForWin;
    } else if (match.home_score === match.away_score) {
      homeTeam.drawn += 1;
      homeTeam.points += pointsForDraw;
    } else {
      homeTeam.lost += 1;
      homeTeam.points += pointsForLoss;
    }
    
    // Update away team stats
    const awayTeam = standings[match.away_team];
    awayTeam.played += 1;
    awayTeam.goalsFor += match.away_score;
    awayTeam.goalsAgainst += match.home_score;
    
    if (match.away_score > match.home_score) {
      awayTeam.won += 1;
      awayTeam.points += pointsForWin;
    } else if (match.away_score === match.home_score) {
      awayTeam.drawn += 1;
      awayTeam.points += pointsForDraw;
    } else {
      awayTeam.lost += 1;
      awayTeam.points += pointsForLoss;
    }
  });

  // Calculate goal differences
  Object.values(standings).forEach(team => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  // Sort standings based on configuration (tiebreakers)
  const tiebreakers = configuration?.tiebreakers || ['goalDifference', 'goalsFor'];
  
  return Object.values(standings).sort((a, b) => {
    // First sort by points
    if (a.points !== b.points) return b.points - a.points;
    
    // Then apply tiebreakers in order
    for (const tiebreaker of tiebreakers) {
      if (tiebreaker === 'goalDifference' && a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      
      if (tiebreaker === 'goalsFor' && a.goalsFor !== b.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }
      
      // Head-to-head tiebreaker would be more complex and require additional logic
      // For simplicity, we're not implementing it fully here
    }
    
    // If all tiebreakers are equal, sort alphabetically by team name
    return a.team.localeCompare(b.team);
  });
};

export const calculateTeamForms = (matches: Match[]): TeamForm[] => {
  const teamMatches: Record<string, Match[]> = {};
  const teams = new Set<string>();
  
  // Group matches by team and identify all teams
  matches.forEach(match => {
    teams.add(match.home_team);
    teams.add(match.away_team);
    
    if (!teamMatches[match.home_team]) teamMatches[match.home_team] = [];
    if (!teamMatches[match.away_team]) teamMatches[match.away_team] = [];
    
    teamMatches[match.home_team].push(match);
    teamMatches[match.away_team].push(match);
  });
  
  // Calculate form for each team
  const teamForms: TeamForm[] = Array.from(teams).map(team => {
    // Sort matches by date (newest first)
    const sortedMatches = teamMatches[team].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Calculate last 5 results and full history
    const formResults: ('W' | 'D' | 'L')[] = [];
    let historyString = '';
    
    sortedMatches.forEach(match => {
      let result: 'W' | 'D' | 'L';
      const isHome = match.home_team === team;
      
      if (isHome) {
        if (match.home_score > match.away_score) result = 'W';
        else if (match.home_score === match.away_score) result = 'D';
        else result = 'L';
      } else {
        if (match.away_score > match.home_score) result = 'W';
        else if (match.away_score === match.home_score) result = 'D';
        else result = 'L';
      }
      
      if (formResults.length < 5) formResults.push(result);
      historyString += result;
    });
    
    return {
      team,
      form: formResults,
      history: historyString,
      position: 0 // This will be updated after sorting
    };
  });
  
  // Sort teams by form points
  const sortedForms = teamForms.sort((a, b) => {
    const aPoints = a.form.reduce((total, result) => 
      total + (result === 'W' ? 3 : result === 'D' ? 1 : 0), 0);
    const bPoints = b.form.reduce((total, result) => 
      total + (result === 'W' ? 3 : result === 'D' ? 1 : 0), 0);
    return bPoints - aPoints;
  });
  
  // Assign positions
  sortedForms.forEach((team, index) => {
    team.position = index + 1;
  });
  
  return sortedForms;
};
