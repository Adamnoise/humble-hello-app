
import { Team, League, HeadToHead } from '../types/match';

// Magyar bajnokság liga adatok
export const hungarianLeague: League = {
  id: 1,
  name: 'OTP Bank Liga',
  logo: 'https://media.api-sports.io/football/leagues/271.png',
  country: 'Magyarország'
};

// Csapatok bővített adatokkal
export const teams: Team[] = [
  { 
    id: 1, 
    name: 'Ferencváros',
    logo: 'https://media.api-sports.io/football/teams/652.png',
    form: 'GYGYV',
    position: 1,
    stats: {
      played: 10,
      wins: 8,
      draws: 1,
      losses: 1,
      goalsFor: 24,
      goalsAgainst: 8
    }
  },
  { 
    id: 2, 
    name: 'Puskás Akadémia',
    logo: 'https://media.api-sports.io/football/teams/5612.png',
    form: 'GYDGY',
    position: 2,
    stats: {
      played: 10,
      wins: 6,
      draws: 2,
      losses: 2,
      goalsFor: 16,
      goalsAgainst: 10
    }
  },
  { 
    id: 3, 
    name: 'Debrecen',
    logo: 'https://media.api-sports.io/football/teams/666.png',
    form: 'DGYGY',
    position: 3,
    stats: {
      played: 10,
      wins: 5,
      draws: 3,
      losses: 2,
      goalsFor: 18,
      goalsAgainst: 11
    }
  },
  { 
    id: 4, 
    name: 'Újpest',
    logo: 'https://media.api-sports.io/football/teams/651.png',
    form: 'VGYGV',
    position: 4,
    stats: {
      played: 10,
      wins: 5,
      draws: 1,
      losses: 4,
      goalsFor: 15,
      goalsAgainst: 14
    }
  }
];

// Segédfüggvény a Head-to-Head mérkőzések generálásához
export const generateHeadToHead = (team1Id: number, team2Id: number): HeadToHead[] => {
  const team1 = teams.find(team => team.id === team1Id);
  const team2 = teams.find(team => team.id === team2Id);
  
  if (!team1 || !team2) return [];
  
  // Példa egymás elleni mérkőzések
  return [
    {
      date: '2023-10-15',
      homeTeam: team1.name,
      awayTeam: team2.name,
      homeScore: 2,
      awayScore: 1,
      winner: 'home'
    },
    {
      date: '2023-05-20',
      homeTeam: team2.name,
      awayTeam: team1.name,
      homeScore: 1,
      awayScore: 1,
      winner: 'draw'
    },
    {
      date: '2022-11-02',
      homeTeam: team1.name,
      awayTeam: team2.name,
      homeScore: 0,
      awayScore: 2,
      winner: 'away'
    },
    {
      date: '2022-04-16',
      homeTeam: team2.name,
      awayTeam: team1.name,
      homeScore: 0,
      awayScore: 1,
      winner: 'away'
    }
  ];
};
