#!/bin/bash

# Quick Portable Demo Builder
echo "🎯 Myrient Viewer - Portable Demo Builder"
echo ""
echo "This script demonstrates building a portable version for testing."
echo "For full builds, use: ./build-portable.sh"
echo ""

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not found"
    echo "Please install Node.js and npm first"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Quick test of PKG binary build (fastest)
echo ""
echo "🔨 Building quick PKG binary for current platform..."
echo "💡 Building server-only version (web interface, no Electron)..."
npx pkg server-only.js --target node18-linux-x64 --out-path dist-pkg-demo/

if [ $? -eq 0 ]; then
    echo "✅ Portable binary built successfully!"
    echo ""
    echo "📁 Output location: dist-pkg-demo/"
    ls -la dist-pkg-demo/
    echo ""
    echo "🚀 To run the portable binary:"
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "   chmod +x dist-pkg-demo/myrient-viewer"
        echo "   ./dist-pkg-demo/myrient-viewer"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "   chmod +x dist-pkg-demo/myrient-viewer"
        echo "   ./dist-pkg-demo/myrient-viewer"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        echo "   ./dist-pkg-demo/myrient-viewer.exe"
    fi
    
    echo ""
    echo "📊 File size:"
    du -h dist-pkg-demo/* 2>/dev/null
    
    echo ""
    echo "🎉 Success! You now have a portable Myrient Viewer!"
    echo "💡 For full portable builds with all platforms: ./build-portable.sh"
    
else
    echo "❌ Build failed"
    echo "Try running with full dependencies: npm install"
    exit 1
fi