
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MatchSubmitButtonProps {
  onClick: () => void;
}

const MatchSubmitButton = ({ onClick }: MatchSubmitButtonProps) => {
  return (
    <div className="flex justify-center my-8 animate-fade-in" style={{animationDelay: "0.5s"}}>
      <Button 
        onClick={onClick}
        className="w-full max-w-xl py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden relative group"
      >
        <span className="z-10 relative">Predikciók futtatása</span>
        <ArrowRight className="w-5 h-5 z-10 relative group-hover:translate-x-1 transition-transform duration-300" />
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </Button>
    </div>
  );
};

export default MatchSubmitButton;
