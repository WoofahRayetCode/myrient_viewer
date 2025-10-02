#!/bin/bash

# Simple Electron Portable Demo Builder
echo "🖥️  Myrient Viewer - Electron Portable Demo"
echo ""
echo "This builds a portable Electron version that runs without installation."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is required but not found${NC}"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install || exit 1
fi

# Build Electron portable for current platform
echo -e "${BLUE}🔨 Building Electron portable for current platform...${NC}"

# Detect platform and build accordingly
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo -e "${BLUE}Building Linux AppImage...${NC}"
    npx electron-builder --linux AppImage
    BUILT_FILE=$(find dist -name "*.AppImage" 2>/dev/null | head -n1)
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${BLUE}Building macOS portable zip...${NC}"
    npx electron-builder --mac zip
    BUILT_FILE=$(find dist -name "*.zip" 2>/dev/null | head -n1)
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo -e "${BLUE}Building Windows portable exe...${NC}"
    npx electron-builder --win portable
    BUILT_FILE=$(find dist -name "*portable*.exe" 2>/dev/null | head -n1)
else
    echo -e "${YELLOW}Unknown platform, building Linux AppImage...${NC}"
    npx electron-builder --linux AppImage
    BUILT_FILE=$(find dist -name "*.AppImage" 2>/dev/null | head -n1)
fi

if [ $? -eq 0 ] && [ -n "$BUILT_FILE" ]; then
    echo -e "${GREEN}✅ Portable application built successfully!${NC}"
    echo ""
    echo -e "${BLUE}📁 Built file:${NC}"
    ls -lh "$BUILT_FILE"
    echo ""
    echo -e "${GREEN}🚀 Usage:${NC}"
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "  chmod +x \"$BUILT_FILE\""
        echo "  ./\"$(basename "$BUILT_FILE")\""
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "  1. Extract the zip file"
        echo "  2. Right-click the app and choose 'Open' (first time only)"
        echo "  3. Double-click to run normally afterward"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        echo "  Double-click \"$(basename "$BUILT_FILE")\" to run"
        echo "  No installation required!"
    fi
    
    echo ""
    echo -e "${BLUE}📊 File size:${NC} $(du -h "$BUILT_FILE" | cut -f1)"
    echo -e "${GREEN}🎉 Portable Myrient Viewer ready for distribution!${NC}"
    
else
    echo -e "${RED}❌ Build failed${NC}"
    echo ""
    echo -e "${YELLOW}💡 Troubleshooting:${NC}"
    echo "1. Make sure all dependencies are installed: ./setup-build.sh"
    echo "2. Try the full portable builder: ./build-portable.sh"
    echo "3. Check for error messages above"
    exit 1
fi