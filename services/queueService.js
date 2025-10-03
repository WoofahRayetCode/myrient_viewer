class QueueService {
  constructor() {
    this.queue = [];
    this.currentPath = '';
  }

  getQueue() {
    return {
      items: this.queue,
      count: this.queue.length,
      totalSize: this.calculateTotalSize()
    };
  }

  setCurrentPath(path) {
    this.currentPath = path || '';
  }

  getFolderName() {
    if (!this.currentPath) return 'downloads';
    
    // Extract the last part of the path as folder name
    const pathParts = this.currentPath.split('/').filter(part => part.length > 0);
    if (pathParts.length === 0) return 'downloads';
    
    // Use the last folder name, sanitized for filesystem
    const folderName = pathParts[pathParts.length - 1]
      .replace(/[^a-zA-Z0-9\-_]/g, '_') // Replace invalid chars with underscore
      .replace(/_{2,}/g, '_')           // Replace multiple underscores with single
      .replace(/^_|_$/g, '');          // Remove leading/trailing underscores
    
    return folderName || 'downloads';
  }

  addToQueue(item) {
    const { v4: uuidv4 } = require('uuid');
    const queueItem = {
      id: uuidv4(),
      url: item.url,
      name: item.name,
      size: item.size || 'Unknown',
      type: this.getFileType(item.name),
      addedAt: new Date().toISOString(),
      status: 'queued'
    };

    // Check if item already exists in queue
    const existingItem = this.queue.find(qItem => qItem.url === item.url);
    if (existingItem) {
      throw new Error('Item already exists in queue');
    }

    this.queue.push(queueItem);
    console.log(`Added to queue: ${queueItem.name}`);
    
    return queueItem;
  }

  removeFromQueue(id) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    const removedItem = this.queue.splice(index, 1)[0];
    console.log(`Removed from queue: ${removedItem.name}`);
    
    return true;
  }

  clearQueue() {
    const count = this.queue.length;
    this.queue = [];
    console.log(`Cleared queue: ${count} items removed`);
    
    return count;
  }

  moveItem(id, direction) {
    const index = this.queue.findIndex(item => item.id === id);
    if (index === -1) return false;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= this.queue.length) {
      return false;
    }

    // Swap items
    [this.queue[index], this.queue[newIndex]] = [this.queue[newIndex], this.queue[index]];
    
    return true;
  }

  exportQueue(format) {
    if (this.queue.length === 0) {
      throw new Error('Queue is empty');
    }

    switch (format) {
      case 'json':
        return {
          exported: new Date().toISOString(),
          count: this.queue.length,
          items: this.queue.map(item => ({
            name: item.name,
            url: item.url,
            size: item.size,
            type: item.type
          }))
        };

      case 'wget':
        return this.generateWgetScript();

      case 'curl':
        return this.generateCurlScript();

      case 'urls':
        return this.queue.map(item => item.url).join('\n');

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  generateWgetScript() {
    const folderName = this.getFolderName();
    let script = '#!/bin/bash\n';
    script += '# Generated wget download script\n';
    script += '# Created: ' + new Date().toISOString() + '\n';
    script += '# Source folder: ' + (this.currentPath || '/') + '\n\n';
    script += 'set -e\n\n';
    script += '# Create downloads directory\n';
    script += `DOWNLOAD_DIR="${folderName}"\n`;
    script += 'mkdir -p "$DOWNLOAD_DIR"\n';
    script += 'cd "$DOWNLOAD_DIR"\n\n';
    script += 'echo "Starting download of ' + this.queue.length + ' files into $DOWNLOAD_DIR directory..."\n\n';

    this.queue.forEach((item, index) => {
      const safeFilename = this.sanitizeFilename(item.name);
      script += `echo "Downloading ${index + 1}/${this.queue.length}: ${item.name}"\n`;
      script += `wget --continue --timeout=30 --tries=3 "${item.url}" -O "${safeFilename}"\n`;
      script += `if [ $? -eq 0 ]; then\n`;
      script += `    echo "✓ Successfully downloaded: ${item.name}"\n`;
      script += `else\n`;
      script += `    echo "✗ Failed to download: ${item.name}"\n`;
      script += `fi\n\n`;
    });

    script += 'echo "Download script completed!"\n';
    script += 'echo "All files downloaded to: $(pwd)"\n';
    
    return script;
  }

  generateCurlScript() {
    const folderName = this.getFolderName();
    let script = '#!/bin/bash\n';
    script += '# Generated curl download script\n';
    script += '# Created: ' + new Date().toISOString() + '\n';
    script += '# Source folder: ' + (this.currentPath || '/') + '\n\n';
    script += 'set -e\n\n';
    script += '# Create downloads directory\n';
    script += `DOWNLOAD_DIR="${folderName}"\n`;
    script += 'mkdir -p "$DOWNLOAD_DIR"\n';
    script += 'cd "$DOWNLOAD_DIR"\n\n';
    script += 'echo "Starting download of ' + this.queue.length + ' files into $DOWNLOAD_DIR directory..."\n\n';

    this.queue.forEach((item, index) => {
      const safeFilename = this.sanitizeFilename(item.name);
      script += `echo "Downloading ${index + 1}/${this.queue.length}: ${item.name}"\n`;
      script += `curl -L --retry 3 --retry-delay 1 --max-time 300 "${item.url}" -o "${safeFilename}"\n`;
      script += `if [ $? -eq 0 ]; then\n`;
      script += `    echo "✓ Successfully downloaded: ${item.name}"\n`;
      script += `else\n`;
      script += `    echo "✗ Failed to download: ${item.name}"\n`;
      script += `fi\n\n`;
    });

    script += 'echo "Download script completed!"\n';
    script += 'echo "All files downloaded to: $(pwd)"\n';
    
    return script;
  }

  sanitizeFilename(filename) {
    // Remove or replace characters that might cause issues in shell
    return filename
      .replace(/['"]/g, '_')
      .replace(/[;&|`$(){}[\]]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');
  }

  calculateTotalSize() {
    let totalBytes = 0;
    let hasUnknownSizes = false;
    let hasKnownSizes = false;

    this.queue.forEach(item => {
      if (item.size && item.size !== 'Unknown' && item.size !== '-' && item.size.trim() !== '') {
        const bytes = this.parseSizeToBytes(item.size);
        if (bytes > 0) {
          totalBytes += bytes;
          hasKnownSizes = true;
        } else {
          // Size string exists but couldn't be parsed
          hasUnknownSizes = true;
        }
      } else {
        // No size information available
        hasUnknownSizes = true;
      }
    });

    // If we have no items in queue
    if (this.queue.length === 0) {
      return 'Unknown';
    }

    // If we have some known sizes, show the total
    if (hasKnownSizes) {
      const formatted = this.formatBytes(totalBytes);
      return hasUnknownSizes ? `~${formatted}+` : formatted;
    }

    // If all sizes are unknown/unparseable, but we have items
    return hasUnknownSizes ? `${this.queue.length} items (sizes unknown)` : 'Unknown';
  }

  parseSizeToBytes(sizeStr) {
    if (!sizeStr || sizeStr === 'Unknown' || sizeStr === '-') return 0;

    const units = {
      'B': 1,
      'K': 1024,
      'KB': 1024,
      'M': 1024 * 1024,
      'MB': 1024 * 1024,
      'G': 1024 * 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'T': 1024 * 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024
    };

    // Support formats like: "32K", "1.5M", "650 MB", "1.2 GB", "1024", "1024 bytes"
    const match = sizeStr.toString().trim().match(/^([\d.]+)\s*([KMGT]?B?|bytes?)?$/i);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    let unit = (match[2] || 'B').toUpperCase();
    
    // Handle "bytes" as "B"
    if (unit === 'BYTES' || unit === 'BYTE') {
      unit = 'B';
    }

    return Math.round(value * (units[unit] || 1));
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
  }

  getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    
    const types = {
      // Archives
      zip: 'archive', rar: 'archive', '7z': 'archive', tar: 'archive', gz: 'archive',
      // ROMs
      rom: 'rom', nes: 'rom', smc: 'rom', sfc: 'rom', n64: 'rom', z64: 'rom', 
      gba: 'rom', nds: 'rom', gb: 'rom', gbc: 'rom',
      // Disc images
      iso: 'disc', cue: 'disc', bin: 'disc', img: 'disc', nrg: 'disc', mdf: 'disc',
      // Documents
      txt: 'document', pdf: 'document', md: 'document', doc: 'document',
      // Images  
      jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', bmp: 'image'
    };

    return types[ext] || 'file';
  }

  getQueueStats() {
    const stats = {
      total: this.queue.length,
      byType: {},
      totalSize: this.calculateTotalSize(),
      oldestItem: null,
      newestItem: null
    };

    if (this.queue.length > 0) {
      // Group by type
      this.queue.forEach(item => {
        stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
      });

      // Find oldest and newest
      const sortedByDate = [...this.queue].sort((a, b) => 
        new Date(a.addedAt) - new Date(b.addedAt)
      );
      
      stats.oldestItem = sortedByDate[0];
      stats.newestItem = sortedByDate[sortedByDate.length - 1];
    }

    return stats;
  }
}



module.exports = new QueueService();