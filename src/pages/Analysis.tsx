
import React from 'react';
import { BarChart3, ChevronLeft, Brain, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";
import Header from "@/components/Header";
import MatchSchedule from "@/components/MatchSchedule";
import PredictionSystem from "@/components/PredictionSystem";
import PatternAnalysis from "@/components/PatternAnalysis";

const Analysis = () => {
  const [activeTab, setActiveTab] = React.useState("matches");

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-500" />
                V-SPORTS ADVANCED ANALYSIS
              </h1>
              <p className="text-gray-400 text-sm mt-1">Match Pattern Detection & Analysis</p>
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
            <Tabs defaultValue="pattern" className="w-full" onValueChange={setActiveTab}>
              <RovingFocusGroup asChild orientation="horizontal">
                <TabsList className="grid grid-cols-3 bg-muted/50 w-full rounded-none">
                  <TabsTrigger 
                    value="pattern" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                  >
                    Pattern Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="prediction" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                  >
                    Prediction Engine
                  </TabsTrigger>
                  <TabsTrigger 
                    value="matches" 
                    className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                  >
                    Match Schedule
                  </TabsTrigger>
                </TabsList>
              </RovingFocusGroup>
              
              <TabsContent value="pattern" className="p-0 mt-0">
                <PatternAnalysis />
              </TabsContent>
              
              <TabsContent value="prediction" className="p-0 mt-0">
                <PredictionSystem />
              </TabsContent>
              
              <TabsContent value="matches" className="p-0 mt-0">
                <MatchSchedule />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-center my-4">
            <Button 
              variant="outline" 
              className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
              asChild
            >
              <Link to="/advanced-pattern">
                <Database className="h-4 w-4 mr-2" />
                Advanced Pattern Detection
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
