const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://myrient.erista.me/files/';

class MyrientService {
  constructor() {
    this.axios = axios.create({
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyrientViewer/1.0)'
      }
    });
  }

  async browseDirectory(path = '') {
    try {
      const url = `${BASE_URL}${path}`;
      console.log(`Fetching directory: ${url}`);
      
      const response = await this.axios.get(url);
      const html = response.data;
      
      return this.parseDirectoryListing(html, url, path);
    } catch (error) {
      console.error('Error fetching directory:', error.message);
      throw new Error(`Failed to fetch directory: ${error.message}`);
    }
  }

  parseDirectoryListing(html, currentUrl, currentPath) {
    const $ = cheerio.load(html);
    const items = [];
    
    // Look for the table rows in the directory listing
    $('table tr').each((index, element) => {
      const $row = $(element);
      const $cells = $row.find('td');
      
      if ($cells.length >= 3) {
        const $nameCell = $cells.first();
        const $link = $nameCell.find('a');
        
        if ($link.length > 0) {
          const href = $link.attr('href');
          const name = $link.text().trim();
          
          // Skip parent directory and current directory links
          if (name === '../' || name === './' || name === 'Parent directory/') {
            return;
          }
          
          const isDirectory = name.endsWith('/');
          const size = $cells.eq(1).text().trim();
          const lastModified = $cells.eq(2).text().trim();
          
          // Build full URL
          let fullUrl;
          if (href.startsWith('http')) {
            fullUrl = href;
          } else {
            fullUrl = new URL(href, currentUrl).href;
          }
          
          // Build path for navigation
          let itemPath;
          if (currentPath) {
            itemPath = `${currentPath}/${name}`;
          } else {
            itemPath = name;
          }
          
          items.push({
            name: name,
            path: itemPath,
            url: fullUrl,
            isDirectory: isDirectory,
            size: isDirectory ? '-' : size,
            lastModified: lastModified,
            type: this.getFileType(name)
          });
        }
      }
    });
    
    // Sort items: directories first, then files, both alphabetically
    items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
    
    return {
      currentPath: currentPath,
      currentUrl: currentUrl,
      parentPath: this.getParentPath(currentPath),
      items: items,
      totalItems: items.length,
      directories: items.filter(item => item.isDirectory).length,
      files: items.filter(item => !item.isDirectory).length
    };
  }
  
  getParentPath(currentPath) {
    if (!currentPath) return null;
    
    const parts = currentPath.split('/').filter(part => part);
    if (parts.length <= 1) return '';
    
    parts.pop();
    return parts.join('/');
  }
  
  getFileType(fileName) {
    if (fileName.endsWith('/')) return 'directory';
    
    const ext = fileName.split('.').pop().toLowerCase();
    
    // ROM/Game file extensions
    const romExtensions = ['zip', 'rar', '7z', 'iso', 'cue', 'bin', 'img', 'nrg', 'mdf', 'rom', 'nes', 'smc', 'sfc', 'n64', 'z64', 'gba', 'nds', 'gb', 'gbc'];
    if (romExtensions.includes(ext)) return 'rom';
    
    // Archive extensions
    const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'];
    if (archiveExtensions.includes(ext)) return 'archive';
    
    // Image extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
    if (imageExtensions.includes(ext)) return 'image';
    
    // Document extensions
    const documentExtensions = ['txt', 'pdf', 'doc', 'docx', 'rtf', 'md'];
    if (documentExtensions.includes(ext)) return 'document';
    
    return 'file';
  }
  
  async searchFiles(query, path = '') {
    try {
      const directoryData = await this.browseDirectory(path);
      const results = [];
      
      // Search in current directory
      directoryData.items.forEach(item => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            ...item,
            matchType: 'name',
            relativePath: path ? `${path}/${item.name}` : item.name
          });
        }
      });
      
      return {
        query: query,
        searchPath: path,
        results: results,
        totalResults: results.length
      };
    } catch (error) {
      console.error('Error searching files:', error.message);
      throw new Error(`Failed to search files: ${error.message}`);
    }
  }
}

module.exports = new MyrientService();