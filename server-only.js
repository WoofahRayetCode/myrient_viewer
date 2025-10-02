#!/usr/bin/env node

// Server-only entry point for PKG builds
// This version excludes Electron and runs only the web server

const path = require('path');
const fs = require('fs');

// Check if running as PKG binary
const isPackaged = typeof process.pkg !== 'undefined';

if (isPackaged) {
  console.log('🚀 Starting Myrient Viewer (Portable Web Server)');
  console.log('💡 This is a web-server only build. Open http://localhost:3000 in your browser.');
  
  // Set environment for PKG mode
  process.env.PKG_MODE = '1';
  process.env.ELECTRON_MODE = '0'; // Explicitly disable Electron mode
} else {
  console.log('🚀 Starting Myrient Viewer (Development Web Server)');
}

// Start the Express server (without Electron dependencies)
try {
  require('./server.js');
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  console.log('💡 Make sure you have an active internet connection for the first run.');
  process.exit(1);
}