
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdvancedPatternAnalysis from '@/components/AdvancedPatternAnalysis';

const AdvancedPattern = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/matches">
            <Button
              variant="ghost"
              className="bg-black/20 border border-white/5 text-white flex items-center gap-2 hover:bg-black/30"
            >
              <ArrowLeft className="h-4 w-4" />
              Vissza a mérkőzésekhez
            </Button>
          </Link>
        </div>
        
        <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg p-6">
          <AdvancedPatternAnalysis />
        </div>
      </div>
    </div>
  );
};

export default AdvancedPattern;
