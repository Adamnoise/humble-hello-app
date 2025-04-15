
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { PatternDefinition } from '../../types/match';
import PatternDetailsContent from './PatternDetailsContent';

interface PatternDetailsViewProps {
  pattern: PatternDefinition;
  isMobile: boolean;
  handleRunAnalysis: () => void;
}

const PatternDetailsView: React.FC<PatternDetailsViewProps> = ({ pattern, isMobile, handleRunAnalysis }) => {
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm">
            Részletek
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{pattern.name}</DrawerTitle>
            <DrawerDescription>{pattern.description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2">
            <PatternDetailsContent pattern={pattern} />
          </div>
          <DrawerFooter>
            <Button className="w-full" onClick={handleRunAnalysis}>Elemzés indítása</Button>
            <DrawerClose asChild>
              <Button variant="outline">Bezárás</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Részletek
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{pattern.name}</DialogTitle>
          <DialogDescription>{pattern.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PatternDetailsContent pattern={pattern} />
        </div>
        <DialogFooter>
          <Button onClick={handleRunAnalysis}>Elemzés indítása</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatternDetailsView;
