
import React from 'react';
import { Trophy, Users, LineChart, Zap, Award, Shield, CheckCircle } from 'lucide-react';

const ValueProposition = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-blue-500" />,
      title: "Kövesd sikereidet",
      description: "Tartsd nyilván minden előrejelzésedet és nézd meg a részletes statisztikákat a teljesítményedről."
    },
    {
      icon: <LineChart className="w-8 h-8 text-blue-500" />,
      title: "Valós idejű frissítések",
      description: "Kapj élő mérkőzés-frissítéseket, azonnali eredményeket, és lásd, hogyan teljesítenek előrejelzéseid valós időben."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Versenyezz barátaiddal",
      description: "Hozz létre privát ligákat, hívd meg barátaidat, és versenyezz, hogy kinek van a legjobb előrejelzési képessége."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Okos elemzések",
      description: "Férj hozzá a csapatstatisztikákhoz, formavezetőkhöz és az egymás elleni eredményekhez a jobb előrejelzésekért."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Szerezz jutalmakat",
      description: "Mászd meg a ranglistákat és gyűjts pontokat, amelyeket exkluzív jutalmakra és díjakra válthatsz be."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Biztonságos platform",
      description: "Adataidat ipari szabványú biztonsági intézkedésekkel és teljes átláthatósággal védjük."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced background pattern with 3D effect and blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1.5px,transparent_1.5px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-blue-950/5 to-black/80"></div>
      </div>
      
      {/* Animated orbs with glassmorphism */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
            Miért válaszd a WinMix Tipster platformot?
          </h2>
          <p className="text-gray-300 text-lg">
            Platformunk mindent biztosít, amire szükséged van a mérkőzés-előrejelzési élmény fokozásához
            és a versenyhez más sportrajongókkal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-950/90 backdrop-blur-xl rounded-2xl p-7 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] animate-slide-in-bottom"
              style={{animationDelay: `${0.1 + index * 0.1}s`}}
            >
              {/* Ambient glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-blue-600/10 transition-colors duration-300 border border-blue-500/10 group-hover:border-blue-500/20 shadow-[0_4px_15px_rgba(59,130,246,0.15)]">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
              
              {/* Floating indicator on hover */}
              <div className="absolute bottom-7 right-7 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
