#!/bin/bash

# Myrient Viewer Setup Script
echo "🚀 Setting up Myrient Viewer..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed or not in PATH"
    echo ""
    echo "Please install npm first using one of these methods:"
    echo ""
    echo "For Ubuntu/Debian:"
    echo "  sudo apt update"
    echo "  sudo apt install npm"
    echo ""
    echo "For Arch Linux:"
    echo "  sudo pacman -S npm"
    echo ""
    echo "For Red Hat/Fedora:"
    echo "  sudo dnf install npm"
    echo ""
    echo "Or download from: https://nodejs.org/"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🌟 Ready to start! Run one of these commands:"
    echo "  npm start        - Start the production server"
    echo "  npm run dev      - Start with auto-reload for development"
    echo ""
    echo "🌐 The app will be available at: http://localhost:3000"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi