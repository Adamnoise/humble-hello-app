
import React from 'react';
import { Brain, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IntegrationCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">V-Sports Analysis</h3>
                <p className="text-sm text-blue-200/70">Advanced pattern detection and match prediction</p>
              </div>
            </div>
            <Button asChild variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
              <Link to="/analysis">
                Explore
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Soccer Championship</h3>
                <p className="text-sm text-emerald-200/70">League tables, rankings, and team statistics</p>
              </div>
            </div>
            <Button asChild variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20">
              <Link to="/league">
                Explore
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationCards;
