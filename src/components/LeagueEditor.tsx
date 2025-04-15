
import React from 'react';
import { ChevronLeft, Save, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LeagueEditor = ({ onBack }) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" 
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 flex items-center gap-2"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Leagues
          </Button>
          
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Edit League Details</h2>
          <p className="text-gray-400 text-sm">Update league information or upload match data</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">League Name</label>
            <input 
              type="text" 
              defaultValue="Premier League" 
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Season</label>
            <input 
              type="text" 
              defaultValue="2023-2024" 
              className="w-full p-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Upload Matches Data (CSV)</h3>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
              Choose CSV File
            </Button>
            
            <div className="flex items-center gap-2 text-emerald-500">
              <Check className="h-4 w-4" />
              <span className="text-sm">Data loaded successfully</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeagueEditor;
