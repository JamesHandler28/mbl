// app/data/events/s1_major1.ts

import { Match } from '../roster'; // We import the Type from index (circular but fine for types)

export const S1_MAJOR_1_INFO = {
  id: "s1-major-1",
  name: "Major 1: Single Elimination",
  championId: "team-rings",
};

export const S1_MAJOR_1_BRACKET: Match[] = [
  // QUARTERFINALS
  { id: "m1", round: "Quarterfinals", team1: "mushroom-kingdom",    team2: "peanuts",       winner: "mushroom-kingdom",     score: "2 - 0" },
  { id: "m2", round: "Quarterfinals", team1: "south-park",          team2: "team-dc",       winner: "team-dc",              score: "1 - 2" },
  { id: "m3", round: "Quarterfinals", team1: "bikini-bottom",       team2: "team-rings",     winner: "team-rings",            score: "0 - 2" },
  { id: "m4", round: "Quarterfinals", team1: "springfield",         team2: "quahog",        winner: "quahog",               score: "0 - 2" },
  // SEMIFINALS
  { id: "m5", round: "Semifinals",    team1: "mushroom-kingdom",    team2: "team-dc",       winner: "team-dc",              score: "0 - 2" },
  { id: "m6", round: "Semifinals",    team1: "team-rings",           team2: "quahog",        winner: "team-rings",            score: "2 - 0" },
  // FINALS
  { id: "m7", round: "Finals",        team1: "team-dc",             team2: "team-rings",     winner: "team-rings",            score: "0 - 2" },
];

export const S1_MAJOR_1_LOGS = [
  // Match 1: Mushroom Kingdom (WIN) vs Peanuts (LOSS)
  {
    matchId: "m1", teamId: "mushroom-kingdom", result: "WIN", gamesCount: 2,
    stats: {
      "Mario":  [2, 0, 3, 33], // K, D, A, Damage
      "Luigi":  [4, 0, 2, 36],
      "Bowser": [1, 0, 1, 11],
      "Peach":  [1, 1, 0, 14],
    }
  },
  {
    matchId: "m1", teamId: "peanuts", result: "LOSS", gamesCount: 2,
    stats: {
      "Charlie B": [0, 2, 0, 6],
      "Snoopy":    [1, 2, 0, 10],
      "Lucy":      [0, 2, 0, 0],
      "Woodstock": [0, 2, 0, 5],
    }
  },

  // Match 2: South Park (LOSS) vs Team DC (WIN)
  {
    matchId: "m2", teamId: "south-park", result: "LOSS", gamesCount: 3,
    stats: {
      "Cartman": [1, 3, 0, 12],
      "Kenny":   [1, 3, 0, 12],
      "Kyle":    [2, 2, 1, 27],
      "Stan":    [3, 2, 1, 39],
    }
  },
  {
    matchId: "m2", teamId: "team-dc", result: "WIN", gamesCount: 3,
    stats: {
      "Superman": [1, 2, 1, 21],
      "Batman":   [2, 2, 1, 27],
      "Flash":    [5, 1, 0, 56],
      "Wonder":   [2, 2, 0, 18],
    }
  },

  // Match 3: Bikini Bottom (LOSS) vs Team Rings (WIN)
  {
    matchId: "m3", teamId: "bikini-bottom", result: "LOSS", gamesCount: 2,
    stats: {
      "SpongeBob": [0, 2, 1, 6],
      "Patrick":   [0, 2, 0, 0],
      "Squidward": [1, 2, 0, 12],
      "Mr. Krabs": [3, 2, 0, 30],
    }
  },
  {
    matchId: "m3", teamId: "team-rings", result: "WIN", gamesCount: 2,
    stats: {
      "Sonic":    [2, 1, 2, 27],
      "Knuckles": [1, 1, 0, 3],
      "Tails":    [3, 0, 0, 18],
      "Shadow":   [2, 2, 1, 33],
    }
  },

  // Match 4: Springfield (LOSS) vs Quahog (WIN)
  {
    matchId: "m4", teamId: "springfield", result: "LOSS", gamesCount: 2,
    stats: {
      "Homer": [0, 2, 1, 12],
      "Bart":  [1, 2, 0, 12],
      "Lisa":  [2, 2, 0, 36],
      "Marge": [0, 2, 0, 0],
    }
  },
  {
    matchId: "m4", teamId: "quahog", result: "WIN", gamesCount: 2,
    stats: {
      "Peter":  [0, 2, 1, 6],
      "Stewie": [1, 0, 1, 12],
      "Brian":  [5, 0, 1, 42],
      "Lois":   [2, 1, 3, 27],
    }
  },

  // Match 5: Mushroom Kingdom (LOSS) vs Team DC (WIN)
  {
    matchId: "m5", teamId: "mushroom-kingdom", result: "LOSS", gamesCount: 2,
    stats: {
      "Mario":  [0, 2, 2, 18],
      "Luigi":  [3, 2, 0, 27],
      "Bowser": [0, 2, 1, 12],
      "Peach":  [1, 2, 0, 6],
    }
  },
  {
    matchId: "m5", teamId: "team-dc", result: "WIN", gamesCount: 2,
    stats: {
      "Superman": [2, 1, 1, 18],
      "Batman":   [0, 2, 2, 12],
      "Flash":    [4, 1, 0, 44],
      "Wonder":   [2, 0, 0, 18],
    }
  },

  // Match 6: Team Rings (WIN) vs Quahog (LOSS)
  {
    matchId: "m6", teamId: "team-rings", result: "WIN", gamesCount: 2,
    stats: {
      "Sonic":    [4, 0, 1, 42],
      "Knuckles": [2, 0, 0, 12],
      "Tails":    [0, 1, 2, 12],
      "Shadow":   [2, 1, 1, 24],
    }
  },
  {
    matchId: "m6", teamId: "quahog", result: "LOSS", gamesCount: 2,
    stats: {
      "Peter":  [1, 2, 0, 6],
      "Stewie": [0, 2, 0, 0],
      "Brian":  [1, 2, 1, 30],
      "Lois":   [0, 2, 0, 0],
    }
  },

  // Match 7: Team DC (LOSS) vs Team Rings (WIN)
  {
    matchId: "m7", teamId: "team-dc", result: "LOSS", gamesCount: 2,
    stats: {
      "Superman": [1, 2, 1, 12],
      "Batman":   [3, 2, 1, 39],
      "Flash":    [1, 2, 0, 8],
      "Wonder":   [0, 2, 1, 6],
    }
  },
  {
    matchId: "m7", teamId: "team-rings", result: "WIN", gamesCount: 2,
    stats: {
      "Sonic":    [3, 2, 2, 33],
      "Knuckles": [3, 1, 1, 24],
      "Tails":    [2, 0, 0, 12],
      "Shadow":   [0, 2, 2, 24],
    }
  },
];