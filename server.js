const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const myrientService = require('./services/myrientService');
const queueService = require('./services/queueService');

const app = express();
const PORT = process.env.PORT || 3000;
const isElectronMode = process.env.ELECTRON_MODE === '1';

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow inline scripts for development
}));
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes

// Browse Myrient directory
app.get('/api/browse/*', async (req, res) => {
  try {
    const requestPath = req.params[0] || '';
    const data = await myrientService.browseDirectory(requestPath);
    res.json(data);
  } catch (error) {
    console.error('Error browsing directory:', error);
    res.status(500).json({ error: 'Failed to browse directory' });
  }
});

// Search files in directory
app.get('/api/search', async (req, res) => {
  try {
    const { q: query, path = '' } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    
    const data = await myrientService.searchFiles(query, path);
    res.json(data);
  } catch (error) {
    console.error('Error searching files:', error);
    res.status(500).json({ error: 'Failed to search files' });
  }
});

// Queue management
app.get('/api/queue', (req, res) => {
  res.json(queueService.getQueue());
});

app.post('/api/queue/add', (req, res) => {
  const { url, name, size, currentPath } = req.body;
  
  if (!url || !name) {
    return res.status(400).json({ error: 'URL and name are required' });
  }
  
  // Set the current path for folder naming
  if (currentPath !== undefined) {
    queueService.setCurrentPath(currentPath);
  }
  
  const item = queueService.addToQueue({ url, name, size });
  res.json(item);
});

app.delete('/api/queue/:id', (req, res) => {
  const { id } = req.params;
  const success = queueService.removeFromQueue(id);
  
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Item not found in queue' });
  }
});

app.get('/api/queue/export/:format', (req, res) => {
  const { format } = req.params;
  
  try {
    const exportData = queueService.exportQueue(format);
    
    switch (format) {
      case 'json':
        res.json(exportData);
        break;
      case 'curl':
      case 'script':
      case 'bash':
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename="download_script.sh"`);
        res.send(exportData);
        break;
      default:
        res.status(400).json({ error: 'Unsupported export format' });
    }
  } catch (error) {
    console.error('Error exporting queue:', error);
    res.status(500).json({ error: 'Failed to export queue' });
  }
});

app.delete('/api/queue', (req, res) => {
  queueService.clearQueue();
  res.json({ success: true });
});

// Get app info (desktop mode, version, etc.)
app.get('/api/info', (req, res) => {
  res.json({
    isDesktop: isElectronMode,
    version: require('./package.json').version,
    name: require('./package.json').name,
    description: require('./package.json').description
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Only start server if this file is run directly (not required)
if (require.main === module) {
  startServer();
}

function startServer() {
  // Start server
  const server = app.listen(PORT, () => {
    if (isElectronMode) {
      console.log(`🚀 Myrient Viewer desktop app server running on port ${PORT}`);
    } else {
      console.log(`🚀 Myrient Viewer server running on http://localhost:${PORT}`);
      console.log(`📁 Browse files at: http://localhost:${PORT}`);
    }
  });

  // Handle graceful shutdown in Electron mode
  if (isElectronMode) {
    process.on('SIGINT', () => {
      console.log('📴 Shutting down server...');
      server.close(() => {
        process.exit(0);
      });
    });
    
    process.on('SIGTERM', () => {
      console.log('📴 Shutting down server...');
      server.close(() => {
        process.exit(0);
      });
    });
  }

  return server;
}

module.exports = { app, startServer };