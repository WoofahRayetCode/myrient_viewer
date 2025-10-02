#!/usr/bin/env node

// Standalone Myrient Viewer Entry Point
// This file is used by PKG to create standalone executables

const path = require('path');
const fs = require('fs');

// Set up paths for bundled resources
const isPackaged = typeof process.pkg !== 'undefined';

if (isPackaged) {
  // When running as PKG binary, adjust paths
  process.env.PKG_MODE = '1';
  
  // Set up asset paths
  const assetPath = path.dirname(process.execPath);
  process.env.ASSET_PATH = assetPath;
  
  console.log('🚀 Starting Myrient Viewer (Portable Binary Mode)');
  console.log(`📁 Asset path: ${assetPath}`);
} else {
  console.log('🚀 Starting Myrient Viewer (Development Mode)');
}

// Start the main server
require('./server.js');