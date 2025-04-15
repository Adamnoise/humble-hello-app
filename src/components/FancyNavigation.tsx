
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  text: string;
  href: string;
  icon: React.ReactNode;
}

const FancyNavigation: React.FC<{ navLinks: NavItem[] }> = ({ navLinks }) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center gap-2">
      {navLinks.map((link, index) => {
        const isActive = location.pathname === link.href;
        
        return (
          <Link
            key={index}
            to={link.href}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-black/70 text-gray-300 hover:text-white hover:bg-black/80 border border-white/10'
            }`}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default FancyNavigation;
