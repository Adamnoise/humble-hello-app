
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Header from "@/components/Header";
import LeagueSeasons from "@/components/LeagueSeasons";
import LeagueEditor from "@/components/LeagueEditor";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import IntegrationCards from "@/components/dashboard/IntegrationCards";
import ContentTabs from "@/components/dashboard/ContentTabs";
import MatchSchedule from "@/components/MatchSchedule";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("matches");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUpdatedAt, setDataUpdatedAt] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setIsRefreshing(false);
      setDataUpdatedAt(new Date());
      toast.success("Data refreshed successfully", {
        description: `All match data has been updated as of ${new Date().toLocaleTimeString()}`
      });
    }, 2000);
  };

  const seasonSelector = (
    <div className="relative flex items-center">
      <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
        <span>2023-2024 Szezon</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        {isEditing ? (
          <LeagueEditor onBack={() => setIsEditing(false)} />
        ) : (
          <>
            <div className="flex flex-col space-y-6">
              <DashboardHeader
                title="V-SPORTS ELEMZŐ RENDSZER"
                subtitle="Professzionális Elemzés és Predikció"
                dataUpdatedAt={dataUpdatedAt}
                isRefreshing={isRefreshing}
                onRefresh={handleRefreshData}
                actionButton={seasonSelector}
              />
              
              {/* Integration Navigation Cards */}
              <IntegrationCards />
              
              {activeTab === "league-list" ? (
                <LeagueSeasons onEdit={() => setIsEditing(true)} />
              ) : (
                <ContentTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isLoading={isLoading}
                />
              )}
              
              {/* Add the MatchSchedule component */}
              {activeTab === "matches" && (
                <MatchSchedule />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Matches;
