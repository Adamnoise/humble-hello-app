
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface FilterPopoverProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  className?: string;
  children: React.ReactNode;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  icon,
  label,
  isOpen,
  onOpenChange,
  selectedCount,
  className,
  children
}) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`bg-black/20 border-white/10 text-white flex items-center gap-2 ${selectedCount > 0 ? 'border-blue-500' : ''} ${className}`}
        >
          {icon}
          <span>{label}</span>
          {selectedCount > 0 && (
            <Badge className="ml-1 h-5 rounded-full bg-blue-500 text-[10px] px-2 py-0">
              {selectedCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-card border-white/10">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
