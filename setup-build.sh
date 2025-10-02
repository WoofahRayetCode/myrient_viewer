#!/bin/bash

# Build Dependencies Setup for Myrient Viewer
echo "🔧 Setting up build dependencies for Myrient Viewer..."

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    echo ""
    echo "Please install Node.js and npm first:"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  sudo apt update && sudo apt install nodejs npm"
    echo ""
    echo "Arch Linux:"
    echo "  sudo pacman -S nodejs npm"
    echo ""
    echo "macOS (with Homebrew):"
    echo "  brew install node"
    echo ""
    echo "Or download from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"
echo -e "${GREEN}✅ node found: $(node --version)${NC}"

# Install all dependencies including dev dependencies
echo -e "${BLUE}📦 Installing all dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Verify build tools are installed
echo -e "${BLUE}🔍 Verifying build tools...${NC}"

if [ -f "node_modules/.bin/electron-builder" ]; then
    echo -e "${GREEN}✅ electron-builder installed${NC}"
else
    echo -e "${YELLOW}⚠️  Installing electron-builder...${NC}"
    npm install electron-builder --save-dev
fi

if [ -f "node_modules/.bin/pkg" ]; then
    echo -e "${GREEN}✅ pkg installed${NC}"
else
    echo -e "${YELLOW}⚠️  Installing pkg...${NC}"
    npm install pkg --save-dev
fi

if [ -f "node_modules/.bin/electron" ]; then
    echo -e "${GREEN}✅ electron installed${NC}"
else
    echo -e "${YELLOW}⚠️  Installing electron...${NC}"
    npm install electron
fi

echo ""
echo -e "${GREEN}🎉 Build dependencies setup complete!${NC}"
echo ""
echo -e "${BLUE}📋 Available build commands:${NC}"
echo "  ./build-portable.sh     - Interactive portable builder"
echo "  ./demo-portable.sh      - Quick demo build"
echo "  ./launch-desktop.sh     - Launch desktop app"
echo "  npm run build-portable  - Build all portable formats"
echo "  npm run build-pkg-all   - Build PKG binaries"
echo ""
echo -e "${GREEN}✨ Ready to build portable applications!${NC}"