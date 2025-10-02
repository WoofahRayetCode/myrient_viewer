#!/bin/bash

# Desktop Application Builder for Myrient Viewer
echo "🏗️  Building Myrient Viewer Desktop Application..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build for current platform
echo "🔨 Building desktop application for current platform..."
npm run pack-desktop

if [ $? -eq 0 ]; then
    echo "✅ Desktop application built successfully!"
    echo "📁 Check the 'dist' directory for the built application"
    
    # Show what was built
    if [ -d "dist" ]; then
        echo ""
        echo "📋 Built files:"
        ls -la dist/
    fi
    
    echo ""
    echo "🚀 To build for all platforms, run:"
    echo "   npm run build-desktop-all"
else
    echo "❌ Build failed"
    exit 1
fi