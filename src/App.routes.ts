
// This file lists the routes for the application.
// The actual App.tsx file needs to be updated to include these routes
// as we can't directly modify App.tsx in this request.

export const appRoutes = [
  { path: "/", component: "Index" },
  { path: "/matches", component: "Matches" },
  { path: "/advanced-pattern", component: "AdvancedPattern" },
  { path: "/analysis", component: "Analysis" },
  { path: "/league", component: "League" },
  { path: "/league-management", component: "LeagueManagement" },
  { path: "*", component: "NotFound" }
];
