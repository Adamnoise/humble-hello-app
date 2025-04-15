
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram, Facebook, Mail, Trophy, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black/80 backdrop-blur-sm pt-20 pb-10 border-t border-white/5 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#3b82f608_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section with improved styling */}
          <div className="col-span-1 lg:col-span-1 animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-600/90 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_10px_rgba(59,130,246,0.3)] backdrop-blur-sm border border-blue-400/20 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(59,130,246,0.4)] transition-all duration-300">
                <Trophy className="text-white h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">WINMIX</span>
                <span className="text-[10px] -mt-1 text-blue-400/80 tracking-widest">TIPSTER</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Készíts előrejelzéseket a közelgő mérkőzésekről és versenyezz barátaiddal, hogy kiderüljön, ki a legjobb.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors duration-300 backdrop-blur-sm border border-white/5 hover:border-blue-500/20">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors duration-300 backdrop-blur-sm border border-white/5 hover:border-blue-500/20">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors duration-300 backdrop-blur-sm border border-white/5 hover:border-blue-500/20">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors duration-300 backdrop-blur-sm border border-white/5 hover:border-blue-500/20">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 animate-slide-in-bottom" style={{animationDelay: '0.2s'}}>
            <h3 className="text-white font-semibold mb-6 border-b border-white/10 pb-2">Gyors linkek</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Kezdőlap
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Közelgő mérkőzések
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Ranglista
                </Link>
              </li>
              <li>
                <Link to="/live" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Élő mérkőzések
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1 animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
            <h3 className="text-white font-semibold mb-6 border-b border-white/10 pb-2">Források</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Támogatás
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  GYIK
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Játékszabályok
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal with enhanced newsletter section */}
          <div className="col-span-1 animate-slide-in-bottom" style={{animationDelay: '0.4s'}}>
            <h3 className="text-white font-semibold mb-6 border-b border-white/10 pb-2">Iratkozz fel</h3>
            <p className="text-gray-400 text-sm mb-4">Kapd meg a legújabb tippeket és frissítéseket</p>
            
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Email címed"
                className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium flex items-center gap-1.5 transition-colors duration-300">
                <span>Küldés</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <h3 className="text-white font-semibold mb-3">Jogi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Felhasználói feltételek
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group">
                  <span className="h-1 w-1 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors duration-200"></span>
                  Adatvédelmi irányelvek
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-14 pt-6 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 WinMix Tipster. Minden jog fenntartva.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Készült <Heart className="h-3 w-3 text-red-500 mx-1" /> sportrajongók számára
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
