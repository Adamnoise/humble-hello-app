
import React from 'react';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LeagueManagementLink: React.FC = () => {
  return (
    <Button 
      variant="outline" 
      className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
      asChild
    >
      <Link to="/league-management">
        <Database className="h-4 w-4 mr-2" />
        League Management
      </Link>
    </Button>
  );
};

export default LeagueManagementLink;
