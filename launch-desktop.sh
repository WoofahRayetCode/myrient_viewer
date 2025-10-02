#!/bin/bash

# Myrient Viewer Desktop Application Launcher
echo "🖥️  Launching Myrient Viewer Desktop Application..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    echo ""
    echo "Please install npm first using one of these methods:"
    echo ""
    echo "For Ubuntu/Debian:"
    echo "  sudo apt update && sudo apt install npm"
    echo ""
    echo "For Arch Linux:"
    echo "  sudo pacman -S npm"
    echo ""
    echo "For Red Hat/Fedora:"
    echo "  sudo dnf install npm"
    echo ""
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies first..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if Electron is installed
if [ ! -f "node_modules/.bin/electron" ]; then
    echo "❌ Electron is not installed. Installing dependencies..."
    npm install
fi

# Launch the desktop application
echo "🚀 Starting Myrient Viewer desktop application..."
npm run electron

echo "👋 Myrient Viewer desktop application closed."