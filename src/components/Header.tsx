
import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, ChartBar, Settings, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './navigation/Navigation';
import { NavItem } from '@/types/navigation';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks: NavItem[] = [
    { text: "Főoldal", href: "/", icon: <Home className="w-4 h-4" /> },
    { text: "Csapatok", href: "/teams", icon: <Users className="w-4 h-4" /> },
    { text: "Mérkőzések", href: "/matches", icon: <Calendar className="w-4 h-4" /> },
    { text: "Statisztika", href: "/statistics", icon: <ChartBar className="w-4 h-4" /> },
    { text: "Rendszer", href: "/system", icon: <Settings className="w-4 h-4" /> },
    { text: "Vezérlőpult", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 
        ${scrolled 
          ? 'backdrop-blur-xl bg-black/30 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b border-white/5' 
          : 'py-5'
        }
      `}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />
        <Navigation navLinks={navLinks} />
      </div>
    </header>
  );
};

export default Header;
