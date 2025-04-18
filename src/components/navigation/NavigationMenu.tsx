
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavItem } from '@/types/navigation';

interface MainNavigationProps {
  items: NavItem[];
}

const MainNavigation: React.FC<MainNavigationProps> = ({ items }) => {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <NavigationMenuItem key={index}>
              <Link 
                to={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive && "bg-primary text-primary-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                <span className="ml-2">{item.text}</span>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
