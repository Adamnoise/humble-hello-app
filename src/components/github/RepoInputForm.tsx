
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Github } from "lucide-react";

interface RepoInputFormProps {
  repoUrl: string;
  searchPath: string;
  githubToken: string;
  isLoading: boolean;
  onRepoUrlChange: (url: string) => void;
  onSearchPathChange: (path: string) => void;
  onGithubTokenChange: (token: string) => void;
  onSearch: () => void;
}

const RepoInputForm = ({
  repoUrl,
  searchPath,
  githubToken,
  isLoading,
  onRepoUrlChange,
  onSearchPathChange,
  onGithubTokenChange,
  onSearch,
}: RepoInputFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="repoUrl" className="text-sm font-medium block mb-1">
          Repository URL
        </label>
        <div className="flex gap-2">
          <Input
            id="repoUrl"
            placeholder="https://github.com/felhasznalo/repo"
            value={repoUrl}
            onChange={(e) => onRepoUrlChange(e.target.value)}
          />
          <Button onClick={onSearch} disabled={isLoading || !repoUrl}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Keresés...
              </>
            ) : (
              "Keresés"
            )}
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="searchPath" className="text-sm font-medium block mb-1">
          Útvonal a repository-n belül (opcionális)
        </label>
        <Input
          id="searchPath"
          placeholder="src/components"
          value={searchPath}
          onChange={(e) => onSearchPathChange(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="githubToken" className="text-sm font-medium block mb-1">
          GitHub Access Token (opcionális, API rate limit növelésére)
        </label>
        <Input
          id="githubToken"
          placeholder="ghp_xxxxxxxxxxxx"
          type="password"
          value={githubToken}
          onChange={(e) => onGithubTokenChange(e.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          A GitHub API korlátozza a kérések számát. Token megadásával növelheti a limitet.
        </p>
      </div>
    </div>
  );
};

export default RepoInputForm;
