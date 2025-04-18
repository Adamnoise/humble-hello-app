import { useState } from "react";
import { fetchAllJsxFiles, fetchFileContent, parseGitHubUrl } from "@/lib/utils/githubFetcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Github, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import RepoInputForm from "./github/RepoInputForm";
import FileList from "./github/FileList";
import ExampleRepos from "./github/ExampleRepos";

interface GitHubImporterProps {
  onFilesLoad: (files: { name: string; content: string }[]) => void;
}

const GitHubImporter = ({ onFilesLoad }: GitHubImporterProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [searchPath, setSearchPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundFiles, setFoundFiles] = useState<{ name: string; url: string; path: string }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; url: string; path: string }[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [githubToken, setGithubToken] = useState(localStorage.getItem('github_token') || "");

  const handleSearch = async () => {
    if (!repoUrl) return;

    setIsLoading(true);
    setError(null);
    setFoundFiles([]);

    try {
      const { owner, repo, path } = parseGitHubUrl(repoUrl);
      const basePath = path || searchPath;

      if (githubToken) {
        localStorage.setItem('github_token', githubToken);
      }

      const files = await fetchAllJsxFiles(owner, repo, basePath);

      if (files.length === 0) {
        setError(`Nem található JSX fájl a megadott útvonal alatt: ${basePath || "/"}`);
      } else {
        setFoundFiles(files);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Hiba történt a GitHub repository keresése közben";
      setError(errorMessage);

      if (errorMessage.includes("rate limit") || errorMessage.includes("403")) {
        toast.error("GitHub API ratelimit elérve vagy nincs jogosultság. Kérjük, próbálja később vagy adjon meg egy GitHub tokent.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFileSelection = (file: { name: string; url: string; path: string }) => {
    if (selectedFiles.some(f => f.url === file.url)) {
      setSelectedFiles(selectedFiles.filter(f => f.url !== file.url));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const selectAllFiles = () => {
    if (selectedFiles.length === foundFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles([...foundFiles]);
    }
  };

  const handleImport = async () => {
    if (selectedFiles.length === 0) return;

    setIsFetching(true);

    try {
      const importedFiles = [];

      for (const file of selectedFiles) {
        const content = await fetchFileContent(file.url);
        importedFiles.push({
          name: file.name,
          content
        });
      }

      onFilesLoad(importedFiles);
      toast.success(`${importedFiles.length} JSX fájl sikeresen importálva`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Hiba történt a fájlok letöltése közben");
      toast.error("Hiba történt az importálás során");
    } finally {
      setIsFetching(false);
    }
  };

  const exampleRepos = [
    "https://github.com/Winmix713/gf",
    "https://github.com/Winmix713/gf/tree/main/src/components",
    "https://github.com/Winmix713/gf/tree/main/src/pages"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="mr-2 h-5 w-5" />
          GitHub Repository Importálása
        </CardTitle>
        <CardDescription>
          Konvertáljon JSX fájlokat közvetlenül GitHub repository-ból
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RepoInputForm
            repoUrl={repoUrl}
            searchPath={searchPath}
            githubToken={githubToken}
            isLoading={isLoading}
            onRepoUrlChange={setRepoUrl}
            onSearchPathChange={setSearchPath}
            onGithubTokenChange={setGithubToken}
            onSearch={handleSearch}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>
                {error.includes("rate limit") || error.includes("403") ? "API Limit Elérve" : "Hiba"}
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FileList
            files={foundFiles}
            selectedFiles={selectedFiles}
            onFileSelect={toggleFileSelection}
            onSelectAll={selectAllFiles}
          />

          <ExampleRepos repos={exampleRepos} onSelect={setRepoUrl} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleImport}
          disabled={selectedFiles.length === 0 || isFetching}
          className="w-full"
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importálás...
            </>
          ) : (
            `Kiválasztott fájlok importálása (${selectedFiles.length})`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GitHubImporter;
