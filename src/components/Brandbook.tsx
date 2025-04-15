
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  ChevronDown,
  Bell,
  Trophy,
  Brain
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Brandbook = () => {
  const [selectedTab, setSelectedTab] = useState("colors");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/95 via-gray-900/98 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Matches Page Brandbook</h1>
            <p className="text-gray-400">Design system and UI components</p>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="animation">Animation</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <ColorCard name="Primary Background" color="bg-gradient-to-b from-gray-900/95 via-gray-900/98 to-black" value="from-gray-900/95 via-gray-900/98 to-black" />
              <ColorCard name="Accent Blue" color="bg-blue-500" value="#3b82f6 (blue-500)" />
              <ColorCard name="Accent Red" color="bg-red-500" value="#ef4444 (red-500)" />
              <ColorCard name="Accent Green" color="bg-emerald-500" value="#10b981 (emerald-500)" />
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Secondary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorCard name="Text Primary" color="bg-white" value="#ffffff (white)" />
              <ColorCard name="Text Secondary" color="bg-gray-400" value="#9ca3af (gray-400)" />
              <ColorCard name="Border Light" color="bg-white/10" value="rgba(255,255,255,0.1)" />
              <ColorCard name="Card Background" color="bg-black/20" value="rgba(0,0,0,0.2)" />
            </div>
          </TabsContent>

          <TabsContent value="typography" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Typography</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Font Family</h3>
                <Card className="bg-black/20 border-white/10">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 mb-2">System font stack with sans-serif fallbacks</p>
                    <p className="font-normal">Regular (400) - The quick brown fox jumps over the lazy dog.</p>
                    <p className="font-medium">Medium (500) - The quick brown fox jumps over the lazy dog.</p>
                    <p className="font-bold">Bold (700) - The quick brown fox jumps over the lazy dog.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Text Sizes</h3>
                <Card className="bg-black/20 border-white/10">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Badge className="mb-1 bg-blue-500/20 text-blue-400 border border-blue-500/30">text-xl</Badge>
                      <p className="text-xl">Headers (Matches header)</p>
                    </div>
                    <div>
                      <Badge className="mb-1 bg-blue-500/20 text-blue-400 border border-blue-500/30">text-base</Badge>
                      <p className="text-base">Subheaders</p>
                    </div>
                    <div>
                      <Badge className="mb-1 bg-blue-500/20 text-blue-400 border border-blue-500/30">text-sm</Badge>
                      <p className="text-sm">Body Text</p>
                    </div>
                    <div>
                      <Badge className="mb-1 bg-blue-500/20 text-blue-400 border border-blue-500/30">text-xs</Badge>
                      <p className="text-xs">Small Text/Labels</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Components</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-black/20 border-white/10 rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Match Card</div>
                          <Badge className="bg-blue-500">Regular</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm">Team A</div>
                          <div className="text-sm">Team B</div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-lg font-bold">2</span>
                          <span className="text-gray-400">:</span>
                          <span className="text-lg font-bold">1</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/20 border-white/10 rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-white/5 bg-gradient-to-r from-red-500/10 to-red-600/5">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Live Match Card</div>
                          <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm">Team A</div>
                          <div className="text-sm">Team B</div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-lg font-bold">0</span>
                          <span className="text-gray-400">:</span>
                          <span className="text-lg font-bold">0</span>
                          <Clock className="h-3 w-3 text-red-500 animate-pulse" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Primary Button</Button>
                  <Button variant="outline" className="bg-black/20 border-white/10">Secondary Button</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-red-500">LIVE</Badge>
                  <Badge className="bg-blue-500">Upcoming</Badge>
                  <Badge className="bg-emerald-500">Completed</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="icons" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Icons</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <IconDisplay icon={<Calendar className="h-5 w-5" />} name="Calendar" />
              <IconDisplay icon={<Clock className="h-5 w-5" />} name="Clock" />
              <IconDisplay icon={<Search className="h-5 w-5" />} name="Search" />
              <IconDisplay icon={<Filter className="h-5 w-5" />} name="Filter" />
              <IconDisplay icon={<Eye className="h-5 w-5" />} name="Eye" />
              <IconDisplay icon={<ChevronDown className="h-5 w-5" />} name="ChevronDown" />
              <IconDisplay icon={<Bell className="h-5 w-5" />} name="Bell" />
              <IconDisplay icon={<Trophy className="h-5 w-5" />} name="Trophy" />
              <IconDisplay icon={<Brain className="h-5 w-5" />} name="Brain" />
            </div>
          </TabsContent>

          <TabsContent value="animation" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Animation & Effects</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Loading States</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                    <div className="w-32 h-4 bg-white/5 rounded animate-pulse mb-2"></div>
                    <div className="w-24 h-4 bg-white/5 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Transitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/5 hover:bg-white/5 transition-colors duration-300">
                    <p className="text-sm">Hover Color (300ms)</p>
                  </div>
                  
                  <div className="p-4 bg-black/20 rounded-lg border border-white/5 hover:scale-105 transition-transform duration-300">
                    <p className="text-sm">Hover Scale (300ms)</p>
                  </div>
                  
                  <div className="group p-4 bg-black/20 rounded-lg border border-white/5">
                    <p className="text-sm">Item <span className="text-blue-400 group-hover:translate-x-1 inline-block transition-transform duration-300">→</span></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Live Indicators</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                    <span className="text-sm">Pulsing Badge</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-ping"></div>
                    <span className="text-sm">Ping Animation</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ColorCard = ({ name, color, value }: { name: string; color: string; value: string }) => (
  <div className="flex flex-col overflow-hidden rounded-lg border border-white/10">
    <div className={`h-16 ${color}`}></div>
    <div className="p-3 bg-black/40">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-400">{value}</div>
    </div>
  </div>
);

const IconDisplay = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="p-4 flex flex-col items-center justify-center gap-2 bg-black/20 rounded-lg border border-white/10">
    {icon}
    <span className="text-xs text-gray-400">{name}</span>
  </div>
);

export default Brandbook;
