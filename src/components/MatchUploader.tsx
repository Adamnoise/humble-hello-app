
import React, { useRef, useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import Papa from 'papaparse';
import type { Match } from "../types/league";

interface MatchUploaderProps {
  onUpload: (matches: Match[]) => void;
}

export const MatchUploader: React.FC<MatchUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [parsedMatches, setParsedMatches] = useState<Match[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setUploadError('Please upload a CSV file');
        return;
      }

      setFile(selectedFile);
      setUploadError(null);
      parseFile(selectedFile);
    }
  };

  const parseFile = (file: File) => {
    setIsUploading(true);
    setProgress(0);

    const increment = 100 / 5; // Simulate 5 steps in the process
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + increment;
      });
    }, 200);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      complete: (results) => {
        clearInterval(interval);
        setProgress(100);

        try {
          // Validate and convert the parsed data
          const matches = results.data
            .filter(row => 
              row.date && 
              row.home_team && 
              row.away_team && 
              row.home_score !== undefined && 
              row.away_score !== undefined
            )
            .map(row => ({
              date: row.date,
              home_team: row.home_team,
              away_team: row.away_team,
              ht_home_score: parseInt(row.ht_home_score || '0', 10),
              ht_away_score: parseInt(row.ht_away_score || '0', 10),
              home_score: parseInt(row.home_score, 10),
              away_score: parseInt(row.away_score, 10),
              round: row.round || undefined
            }));

          if (matches.length === 0) {
            throw new Error('No valid match data found in the CSV');
          }

          setParsedMatches(matches);
          toast.success(`Successfully parsed ${matches.length} matches`);
        } catch (error) {
          setUploadError(error instanceof Error ? error.message : 'Failed to parse CSV data');
          toast.error('Error parsing CSV data');
        } finally {
          setIsUploading(false);
        }
      },
      error: (error) => {
        clearInterval(interval);
        setIsUploading(false);
        setUploadError(error.message);
        toast.error('Error parsing CSV file');
      }
    });
  };

  const handleUpload = () => {
    if (parsedMatches.length > 0) {
      onUpload(parsedMatches);
      toast.success(`${parsedMatches.length} matches uploaded successfully`);
      // Reset state
      setFile(null);
      setParsedMatches([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-dashed border-white/30 bg-black/30 p-6 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center text-center">
          <Upload className="h-10 w-10 text-white/50 mb-2" />
          <h3 className="text-lg font-medium text-white">Upload Match Data (CSV)</h3>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            Upload a CSV file with match data. The file should contain columns for date, home_team, away_team, ht_home_score, ht_away_score, home_score, away_score, and optionally round.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          variant="outline"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Parsing...' : 'Select CSV File'}
        </Button>

        {file && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white">{file.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={() => {
                setFile(null);
                setParsedMatches([]);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isUploading && (
          <div className="w-full max-w-xs">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-400 mt-1 text-center">
              {progress < 100 ? 'Parsing file...' : 'Validating data...'}
            </p>
          </div>
        )}

        {uploadError && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{uploadError}</span>
          </div>
        )}

        {parsedMatches.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>{parsedMatches.length} valid matches found</span>
            </div>

            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleUpload}
            >
              Upload Matches
            </Button>
          </div>
        )}
      </div>

      {parsedMatches.length > 0 && (
        <div className="text-sm text-gray-400">
          <p className="font-medium mb-2">Preview of parsed data:</p>
          <div className="overflow-x-auto max-h-40 rounded-lg border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Home Team</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Away Team</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">HT</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">FT</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Round</th>
                </tr>
              </thead>
              <tbody className="bg-black/10 divide-y divide-white/10">
                {parsedMatches.slice(0, 5).map((match, index) => (
                  <tr key={index} className="hover:bg-white/5">
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">{match.date}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">{match.home_team}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">{match.away_team}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">
                      {match.ht_home_score} - {match.ht_away_score}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">
                      {match.home_score} - {match.away_score}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-white">{match.round || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedMatches.length > 5 && (
              <div className="text-center py-2 text-xs text-gray-400">
                ...and {parsedMatches.length - 5} more matches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
