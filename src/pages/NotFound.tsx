
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black flex flex-col">
      <Header />
      
      <main className="flex flex-grow items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 relative">
              <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-xl animate-pulse-subtle"></div>
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                <span className="text-5xl font-bold text-white">404</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Page Not Found
            </h1>
            
            <p className="text-gray-400 mb-8">
              We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg border border-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
