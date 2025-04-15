
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from '@/types/navigation';

interface NavigationProps {
  navLinks: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-2">
      {navLinks.map((link, index) => {
        const isActive = location.pathname === link.href;
        
        return (
          <Link
            key={index}
            to={link.href}
            className={`
              flex items-center gap-2 rounded-xl px-4 py-2.5 
              transition-all duration-300 hover:scale-105
              ${isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                : 'bg-black/70 text-gray-300 hover:text-white hover:bg-black/80 border border-white/10'
              }
            `}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.text}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
