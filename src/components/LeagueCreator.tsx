
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, ChevronLeft, Plus, Save, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { LeagueData, LeagueConfiguration } from '../types/league';

interface LeagueCreatorProps {
  onBack: () => void;
  onSave: (league: LeagueData) => void;
}

export const LeagueCreator: React.FC<LeagueCreatorProps> = ({ onBack, onSave }) => {
  const [teams, setTeams] = useState<string[]>([]);
  const [teamInput, setTeamInput] = useState('');
  
  const form = useForm<LeagueData>({
    defaultValues: {
      name: '',
      season: '',
      status: 'in-progress',
      configuration: {
        pointsForWin: 3,
        pointsForDraw: 1,
        pointsForLoss: 0,
        promotionSpots: 3,
        relegationSpots: 3,
        tiebreakers: ['goalDifference', 'goalsFor', 'headToHead'],
      }
    }
  });

  const handleAddTeam = () => {
    if (teamInput.trim() && !teams.includes(teamInput.trim())) {
      setTeams([...teams, teamInput.trim()]);
      setTeamInput('');
    }
  };

  const handleRemoveTeam = (team: string) => {
    setTeams(teams.filter(t => t !== team));
  };

  const onSubmit = (data: LeagueData) => {
    if (teams.length < 2) {
      toast.error("A league must have at least 2 teams");
      return;
    }
    
    const leagueData: LeagueData = {
      ...data,
      teams,
      id: Date.now().toString() // Simple ID generation, should use UUID in production
    };
    
    onSave(leagueData);
    toast.success("League created successfully");
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Save className="w-4 h-4" />
          Save League
        </Button>
      </div>
      
      <Card className="border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-white">Create New League</CardTitle>
          <CardDescription className="text-gray-400">Configure your league settings and add teams</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">League Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter league name"
                          className="bg-black/30 border-white/10 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Season</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., 2023-2024"
                          className="bg-black/30 border-white/10 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">League Configuration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="configuration.pointsForWin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Points for Win</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="bg-black/30 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="configuration.pointsForDraw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Points for Draw</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="bg-black/30 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="configuration.pointsForLoss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Points for Loss</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="bg-black/30 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="configuration.promotionSpots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Promotion Spots</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="bg-black/30 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="configuration.relegationSpots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Relegation Spots</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="bg-black/30 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Teams</h3>
                <div className="flex flex-wrap gap-3">
                  {teams.map((team, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 bg-blue-500/20 rounded-full flex items-center gap-2 text-sm"
                    >
                      <span className="text-blue-300">{team}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTeam(team)} 
                        className="text-blue-300 hover:text-blue-100 transition-colors"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value)}
                    placeholder="Add a team"
                    className="bg-black/30 border-white/10 text-white"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddTeam}
                    variant="outline"
                    className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
