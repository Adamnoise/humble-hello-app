
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderTree } from "lucide-react";

interface FileListProps {
  files: { name: string; url: string; path: string }[];
  selectedFiles: { name: string; url: string; path: string }[];
  onFileSelect: (file: { name: string; url: string; path: string }) => void;
  onSelectAll: () => void;
}

const FileList = ({ files, selectedFiles, onFileSelect, onSelectAll }: FileListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="border rounded-md">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h4 className="font-medium flex items-center">
            <FolderTree className="mr-2 h-4 w-4" />
            Talált JSX fájlok
          </h4>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{files.length} fájl</Badge>
            <Button variant="outline" size="sm" onClick={onSelectAll}>
              {selectedFiles.length === files.length
                ? "Kiválasztás törlése"
                : "Összes kiválasztása"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Kiválasztva</TableHead>
              <TableHead>Fájlnév</TableHead>
              <TableHead>Útvonal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow
                key={file.url}
                className={selectedFiles.some((f) => f.url === file.url) ? "bg-muted/40" : ""}
                onClick={() => onFileSelect(file)}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedFiles.some((f) => f.url === file.url)}
                    onChange={() => onFileSelect(file)}
                    className="h-4 w-4"
                  />
                </TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell className="text-gray-600 text-sm">{file.path}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileList;
