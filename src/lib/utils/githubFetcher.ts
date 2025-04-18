
/**
 * GitHub API interaction utilities
 * Functions to fetch and process files from GitHub repositories
 */

/**
 * Fetch content from a GitHub repository path
 * @param owner - GitHub repository owner/username
 * @param repo - Repository name
 * @param path - File or directory path within the repository
 * @returns Promise with fetched content
 */
export async function fetchGitHubContent(owner: string, repo: string, path: string = '') {
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    // Add authorization token if available in local storage
    const headers: HeadersInit = {};
    const githubToken = localStorage.getItem('github_token');
    if (githubToken) {
      headers.Authorization = `token ${githubToken}`;
    }
    
    const response = await fetch(apiUrl, { headers });
    
    if (response.status === 403) {
      const rateLimit = response.headers.get('x-ratelimit-remaining') || 'unknown';
      throw new Error(`GitHub API rate limit reached (${rateLimit} requests remaining). Try again later or provide a GitHub token.`);
    }
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub content:', error);
    throw error;
  }
}

/**
 * Fetch file content from a GitHub raw URL
 * @param url - Raw content URL
 * @returns Promise with file content as string
 */
export async function fetchFileContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw error;
  }
}

/**
 * Parse GitHub repository URL to extract owner and repo
 * @param url - GitHub repository URL
 * @returns Object containing owner and repo name
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string; path: string } {
  try {
    // Handle both https://github.com/owner/repo and https://github.com/owner/repo/tree/branch/path formats
    const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)(?:\/tree\/[^\/]+\/(.+))?/;
    const match = url.match(githubRegex);
    
    if (!match) {
      throw new Error('Invalid GitHub URL format');
    }
    
    return {
      owner: match[1],
      repo: match[2],
      path: match[3] || ''
    };
  } catch (error) {
    console.error('Error parsing GitHub URL:', error);
    throw new Error('Could not parse GitHub repository URL. Please check the format.');
  }
}

/**
 * Recursively fetch all JSX files from a GitHub repository path
 * @param owner - GitHub repository owner
 * @param repo - Repository name
 * @param path - Directory path
 * @returns Promise with array of files with name and download URL
 */
export async function fetchAllJsxFiles(owner: string, repo: string, path: string = ''): Promise<{name: string, url: string, path: string}[]> {
  try {
    const contents = await fetchGitHubContent(owner, repo, path);
    let files: {name: string, url: string, path: string}[] = [];
    
    // If contents is an array, it's a directory
    if (Array.isArray(contents)) {
      for (const item of contents) {
        if (item.type === 'file' && item.name.endsWith('.jsx')) {
          // Add JSX file to the list
          files.push({
            name: item.name,
            url: item.download_url,
            path: item.path
          });
        } else if (item.type === 'dir') {
          try {
            // Recursively fetch files from subdirectory
            const subFiles = await fetchAllJsxFiles(owner, repo, item.path);
            files = [...files, ...subFiles];
          } catch (error) {
            console.warn(`Skipping directory ${item.path} due to error:`, error);
            // Continue with other directories instead of failing completely
            continue;
          }
        }
      }
    }
    
    return files;
  } catch (error) {
    console.error('Error fetching JSX files:', error);
    throw error;
  }
}
