
import React from 'react';
import Header from '../components/Header';
import PredictionSystem from '../components/PredictionSystem';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">Vezérlőpult</h1>
        <PredictionSystem />
      </div>
    </div>
  );
};

export default Dashboard;
