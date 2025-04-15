
export interface Team {
  id: string;
  name: string; 
  logoUrl: string;
  league: string;
}

export const PREMIER_LEAGUE_TEAMS: Team[] = [
  { id: "arsenal", name: "London Ágyúk", logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", league: "premier-league" },
  { id: "astonvilla", name: "Aston Oroszlán", logoUrl: "https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Aston_Villa_logo.svg/1200px-Aston_Villa_logo.svg.png", league: "premier-league" },
  { id: "brentford", name: "Brentford", logoUrl: "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg", league: "premier-league" },
  { id: "brighton", name: "Brighton", logoUrl: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg", league: "premier-league" },
  { id: "chelsea", name: "Chelsea", logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", league: "premier-league" },
  { id: "palace", name: "Crystal Palace", logoUrl: "https://upload.wikimedia.org/wikipedia/sco/thumb/0/0c/Crystal_Palace_FC_logo.svg/1200px-Crystal_Palace_FC_logo.svg.png", league: "premier-league" },
  { id: "everton", name: "Everton", logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg", league: "premier-league" },
  { id: "fulham", name: "Fulham", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fulham_FC_%28shield%29.svg/1200px-Fulham_FC_%28shield%29.svg.png", league: "premier-league" },
  { id: "liverpool", name: "Liverpool", logoUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", league: "premier-league" },
  { id: "mancity", name: "Manchester Kék", logoUrl: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", league: "premier-league" },
  { id: "newcastle", name: "Newcastle", logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg", league: "premier-league" },
  { id: "nottingham", name: "Nottingham", logoUrl: "https://upload.wikimedia.org/wikipedia/sco/thumb/d/d2/Nottingham_Forest_logo.svg/1200px-Nottingham_Forest_logo.svg.png", league: "premier-league" },
  { id: "tottenham", name: "Tottenham", logoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg", league: "premier-league" },
  { id: "manutd", name: "Vörös Ördögök", logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg", league: "premier-league" },
  { id: "westham", name: "West Ham", logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg", league: "premier-league" },
  { id: "wolves", name: "Wolverhampton", logoUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg", league: "premier-league" },
].sort((a, b) => a.name.localeCompare(b.name));
