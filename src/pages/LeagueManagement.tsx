
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Upload, TrendingUp, ListFilter, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from 'sonner';
import Header from "@/components/Header";
import { LeagueCreator } from "@/components/LeagueCreator";
import { LeagueDetails } from "@/components/LeagueDetails";
import { MatchUploader } from "@/components/MatchUploader";
import { LeagueStatistics } from "@/components/LeagueStatistics";
import type { LeagueData, Match } from "../types/league";

// Sample initial leagues - in a real app this would come from an API or database
const initialLeagues: LeagueData[] = [
  { 
    id: '1',
    name: 'Premier League', 
    season: '2023-2024',
    status: 'in-progress',
  },
  { 
    id: '2',
    name: 'La Liga', 
    season: '2023-2024',
    status: 'in-progress',
  }
];

const LeagueManagement: React.FC = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<LeagueData[]>(initialLeagues);
  const [selectedLeague, setSelectedLeague] = useState<LeagueData | null>(null);
  const [isCreatingLeague, setIsCreatingLeague] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLeagues = localStorage.getItem('leagues');
    const savedMatches = localStorage.getItem('matches');
    
    if (savedLeagues) {
      try {
        setLeagues(JSON.parse(savedLeagues));
      } catch (error) {
        console.error('Error parsing saved leagues:', error);
      }
    }
    
    if (savedMatches) {
      try {
        setMatches(JSON.parse(savedMatches));
      } catch (error) {
        console.error('Error parsing saved matches:', error);
      }
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (leagues.length > 0) {
      localStorage.setItem('leagues', JSON.stringify(leagues));
    }
    
    if (matches.length > 0) {
      localStorage.setItem('matches', JSON.stringify(matches));
    }
  }, [leagues, matches]);

  const handleCreateLeague = (league: LeagueData) => {
    setLeagues(prev => [...prev, league]);
    setIsCreatingLeague(false);
    setSelectedLeague(league);
    toast.success(`League "${league.name}" created successfully`);
  };
  
  const handleUpdateLeague = (updatedLeague: LeagueData) => {
    setLeagues(prev => 
      prev.map(league => 
        league.id === updatedLeague.id ? updatedLeague : league
      )
    );
    setSelectedLeague(updatedLeague);
    toast.success(`League "${updatedLeague.name}" updated successfully`);
  };
  
  const handleUpdateMatches = (uploadedMatches: Match[]) => {
    setMatches(uploadedMatches);
    setActiveTab('statistics');
    toast.success(`${uploadedMatches.length} matches uploaded successfully`);
  };

  const handleBackToLeagueList = () => {
    setSelectedLeague(null);
    setIsCreatingLeague(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">League Management</h1>
            <p className="text-gray-400 mt-1">Create, manage leagues and upload match data</p>
          </div>
          
          {!selectedLeague && !isCreatingLeague && (
            <Button 
              onClick={() => setIsCreatingLeague(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New League
            </Button>
          )}
        </div>
        
        {isCreatingLeague ? (
          <LeagueCreator 
            onBack={handleBackToLeagueList} 
            onSave={handleCreateLeague} 
          />
        ) : selectedLeague ? (
          <div className="space-y-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-black/20 rounded-xl grid grid-cols-3">
                <TabsTrigger value="details" className="rounded-l-xl data-[state=active]:bg-blue-500/20">
                  Details
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-blue-500/20">
                  Upload Data
                </TabsTrigger>
                <TabsTrigger value="statistics" className="rounded-r-xl data-[state=active]:bg-blue-500/20">
                  Statistics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <LeagueDetails 
                  league={selectedLeague} 
                  matches={matches}
                  onBack={handleBackToLeagueList}
                  onUpdateLeague={handleUpdateLeague}
                  onUpdateMatches={handleUpdateMatches}
                />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-6">
                <Card className="border-white/10 bg-black/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-400" />
                      <h2 className="text-xl font-medium text-white">Upload Match Data</h2>
                    </div>
                    <Button
                      onClick={handleBackToLeagueList}
                      variant="outline"
                      className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Back to Leagues
                    </Button>
                  </div>
                  
                  <MatchUploader onUpload={handleUpdateMatches} />
                </Card>
              </TabsContent>
              
              <TabsContent value="statistics" className="mt-6">
                <Card className="border-white/10 bg-black/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      <h2 className="text-xl font-medium text-white">League Statistics</h2>
                    </div>
                    <Button
                      onClick={handleBackToLeagueList}
                      variant="outline"
                      className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      Back to Leagues
                    </Button>
                  </div>
                  
                  <LeagueStatistics matches={matches} />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="border-white/10 bg-black/20">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Database className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-medium text-white">Your Leagues</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leagues.map((league) => (
                  <Card 
                    key={league.id}
                    className="border-white/10 bg-black/40 hover:bg-black/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLeague(league)}
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-white">{league.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          league.status === 'completed' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {league.status === 'completed' ? 'Completed' : 'In Progress'}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm">Season: {league.season}</p>
                      
                      <div className="pt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card 
                  className="border-dashed border-white/20 bg-black/20 hover:bg-black/30 cursor-pointer transition-colors flex items-center justify-center"
                  onClick={() => setIsCreatingLeague(true)}
                >
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Plus className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-medium text-lg text-white">Create New League</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Set up a new league and configure its settings
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        )}
        
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
            onClick={() => navigate('/league')}
          >
            <ListFilter className="h-4 w-4 mr-2" />
            View League Tables
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeagueManagement;
