
import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Brain, Trophy, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import FancyNavigation from './FancyNavigation';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { text: "Mérkőzések", href: "/matches", icon: <Calendar className="w-4 h-4" /> },
    { text: "V-Sports Elemzés", href: "/analysis", icon: <Brain className="w-4 h-4" /> },
    { text: "Vezérlőpult", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
      ? 'backdrop-blur-xl bg-black/30 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b border-white/5' 
      : 'py-5'
    }`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />
        <FancyNavigation navLinks={navLinks} />
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/80 backdrop-blur-xl z-40 animate-fade-in">
          <div className="p-6 flex flex-col h-full">
            <div className="space-y-2 py-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${location.pathname === link.href 
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
