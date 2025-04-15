
import React from 'react';
import { Filter } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import FilterPopover from './FilterPopover';

interface CheckboxFilterItem {
  id: number | string;
  name: string;
  description?: string;
}

interface CheckboxFilterProps {
  label: string;
  items: CheckboxFilterItem[];
  selectedIds: (number | string)[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onToggleItem: (id: number | string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  label,
  items,
  selectedIds,
  isOpen,
  setIsOpen,
  onToggleItem,
  searchPlaceholder = "Search...",
  showSearch = true
}) => {
  return (
    <FilterPopover
      icon={<Filter className="h-4 w-4" />}
      label={label}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      selectedCount={selectedIds.length}
    >
      <Command>
        {showSearch && (
          <CommandInput placeholder={searchPlaceholder} className="h-9 border-white/10" />
        )}
        <CommandList>
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {items.map(item => (
              <CommandItem
                key={item.id}
                onSelect={() => onToggleItem(item.id)}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={selectedIds.includes(item.id)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <span>{item.name}</span>
                {item.description && (
                  <span className="text-xs text-gray-400 ml-auto">{item.description}</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterPopover>
  );
};

export default CheckboxFilter;
