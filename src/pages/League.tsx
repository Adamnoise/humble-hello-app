
import React, { useState } from 'react';
import { Trophy, ChevronLeft, Table, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";
import Header from "@/components/Header";
import LeagueTable from "@/components/LeagueTable";
import FormTable from "@/components/FormTable";
import BothTeamsScored from "@/components/BothTeamsScored";

const League = () => {
  const [activeTab, setActiveTab] = useState("standings");
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Trophy className="h-6 w-6 text-emerald-500" />
                SOCCER CHAMPIONSHIP MANAGER
              </h1>
              <p className="text-gray-400 text-sm mt-1">League Tables & Team Statistics</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 border-white/10 text-white"
                asChild
              >
                <Link to="/matches">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Matches
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
            <Tabs defaultValue="standings" className="w-full" onValueChange={setActiveTab}>
              <RovingFocusGroup asChild orientation="horizontal">
                <TabsList className="grid grid-cols-3 bg-muted/50 w-full rounded-none">
                  <TabsTrigger 
                    value="standings" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-black/20"
                  >
                    League Table
                  </TabsTrigger>
                  <TabsTrigger 
                    value="form" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-black/20"
                  >
                    Form Table
                  </TabsTrigger>
                  <TabsTrigger 
                    value="goals" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-black/20"
                  >
                    Goals Analysis
                  </TabsTrigger>
                </TabsList>
              </RovingFocusGroup>
              
              <TabsContent value="standings" className="p-0 mt-0">
                <LeagueTable />
              </TabsContent>
              
              <TabsContent value="form" className="p-0 mt-0">
                <FormTable />
              </TabsContent>
              
              <TabsContent value="goals" className="p-0 mt-0">
                <BothTeamsScored />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-center my-4">
            <Button 
              variant="outline" 
              className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              asChild
            >
              <Link to="/matches">
                <LineChart className="h-4 w-4 mr-2" />
                View Live Matches
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;
