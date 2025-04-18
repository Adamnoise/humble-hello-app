
import React from "react";

interface ExampleReposProps {
  repos: string[];
  onSelect: (url: string) => void;
}

const ExampleRepos = ({ repos, onSelect }: ExampleReposProps) => {
  return (
    <div className="text-sm text-muted-foreground">
      <p>Példa repository URL-ek:</p>
      <ul className="list-disc pl-5 space-y-1 mt-1">
        {repos.map((url, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(url)}
          >
            {url}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleRepos;
