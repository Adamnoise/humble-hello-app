
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Upload, FilePlus, Sliders } from 'lucide-react';
import { DataSource } from '../../types/match';

interface DataSourcesTabProps {
  dataSources: DataSource[];
  handleImportData: () => void;
}

const DataSourcesTab: React.FC<DataSourcesTabProps> = ({ dataSources, handleImportData }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500">Aktív</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500">Inaktív</span>;
      case 'error':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500">Hiba</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500">{status}</span>;
    }
  };

  const getSourceTypeBadge = (type: string) => {
    switch (type) {
      case 'api':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500">API</span>;
      case 'csv':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500">CSV</span>;
      case 'database':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500">Adatbázis</span>;
      case 'manual':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500">Manuális</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-500">{type}</span>;
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Adatforrások</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 flex items-center gap-1"
            onClick={handleImportData}
          >
            <Upload className="h-4 w-4" />
            <span>Importálás</span>
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            <FilePlus className="h-4 w-4" />
            <span>Új adatforrás</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Név</TableHead>
                <TableHead className="text-gray-400 font-normal">Típus</TableHead>
                <TableHead className="text-gray-400 font-normal">Leírás</TableHead>
                <TableHead className="text-gray-400 font-normal">Utolsó szinkronizálás</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">Mérkőzések</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">Státusz</TableHead>
                <TableHead className="text-gray-400 font-normal"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((source) => (
                <TableRow key={source.id} className="border-b border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{source.name}</TableCell>
                  <TableCell>{getSourceTypeBadge(source.type)}</TableCell>
                  <TableCell className="text-gray-300">{source.description}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(source.lastSync).toLocaleString('hu-HU')}
                  </TableCell>
                  <TableCell className="text-center font-medium text-white">{source.matches}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(source.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Sliders className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DataSourcesTab;
