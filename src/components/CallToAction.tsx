
import React from 'react';
import { ArrowRight, CheckCircle, Trophy as TrophyIcon, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopPredictions from './TopPredictions';
import MatchResults from './match/MatchResults';

interface CallToActionProps {
  children?: React.ReactNode;
  showMatchResults?: boolean;
  matches?: any[];
}

const CallToAction: React.FC<CallToActionProps> = ({ children, showMatchResults = false, matches = [] }) => {
  const benefits = [
    "Hozzáférés az összes előrejelzési funkcióhoz",
    "Csatlakozás exkluzív tippversenyekhez",
    "Teljesítményed követése részletes analitikákkal",
    "Versenyezz jutalmakért és díjakért"
  ];
  
  return (
    <section className="py-28 relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 via-blue-900/10 to-transparent opacity-80"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        
        {/* Animated glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto animate-slide-in-bottom">
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/95 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl p-[1px] [background:linear-gradient(to_right,theme(colors.blue.400/20),theme(colors.blue.600/20),theme(colors.blue.400/20))] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Top border gradient */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-400/70 via-blue-500/70 to-blue-600/70"></div>
            
            {/* Glowing light effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-blue-500/20 blur-[100px] -z-10"></div>
            
            <div className="p-10 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {!showMatchResults ? (
                  <div>
                    <div className="inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500/20 to-blue-500/5 backdrop-blur-sm rounded-full mb-8 border border-blue-500/20">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">Emeld szintet tippelési élményed</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                      Készen állsz tesztelni előrejelzési képességeidet?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                      Csatlakozz ezrekhez, akik előrejelzéseket készítenek, versenyeznek barátaikkal, és megmásszák a ranglistákat.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start group">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/10 border border-blue-500/30 mr-3 mt-0.5 group-hover:bg-blue-500/20 transition-colors duration-300">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to="/signup"
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.5)] transition-all duration-300"
                      >
                        <span className="relative z-10">Ingyenes fiók létrehozása</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                      </Link>
                      
                      <Link 
                        to="/explore"
                        className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <span>Mérkőzések böngészése</span>
                        <Star className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-2 w-full">
                    <MatchResults matches={matches} />
                  </div>
                )}
                
                {/* Right side: TopPredictions or default decorative image */}
                {!showMatchResults && (
                  <div className="relative h-full min-h-[350px] rounded-xl overflow-hidden">
                    {children ? (
                      children
                    ) : (
                      <>
                        {/* Default decorative 3D gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm"></div>
                        
                        {/* Animated pulse rings */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-blue-500/10 animate-pulse-subtle"></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-500/20 animate-pulse-subtle" style={{animationDelay: '0.5s'}}></div>
                        
                        {/* Trophy illustration with advanced 3D glow effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute -inset-10 bg-blue-500/20 rounded-full blur-[50px] animate-pulse-subtle"></div>
                            
                            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/80 to-blue-600 flex items-center justify-center shadow-[0_8px_30px_rgba(59,130,246,0.5)] border border-blue-400/30 backdrop-blur-xl animate-float">
                              <TrophyIcon className="text-white h-20 w-20 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                            </div>
                            
                            {/* 3D lighting effect */}
                            <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-white/40 blur-md"></div>
                          </div>
                        </div>
                        
                        {/* Decorative floating elements */}
                        <div className="absolute top-[10%] right-[10%] w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-600/40 backdrop-blur-sm border border-blue-400/20 flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.3)] animate-float" style={{animationDuration: '4s'}}>
                          <Star className="text-white h-5 w-5" />
                        </div>
                        
                        <div className="absolute bottom-[15%] left-[15%] w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 backdrop-blur-sm border border-purple-400/20 flex items-center justify-center shadow-[0_4px_20px_rgba(139,92,246,0.3)] animate-float" style={{animationDuration: '5s', animationDelay: '1s'}}>
                          <Sparkles className="text-white h-4 w-4" />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
