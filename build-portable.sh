#!/bin/bash

# Portable Application Builder for Myrient Viewer
echo "📦 Building Portable Myrient Viewer Applications..."

# Update version to current date
echo "🗓️ Updating version to current date..."
node update-version.js

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check dependencies
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $1 found${NC}"
        return 0
    fi
}

# Check npm packages
check_npm_package() {
    if [ ! -f "node_modules/.bin/$1" ] && ! npm list $1 &> /dev/null; then
        echo -e "${RED}❌ $1 npm package not found${NC}"
        echo -e "${YELLOW}💡 Installing missing package...${NC}"
        npm install $1
        return $?
    else
        echo -e "${GREEN}✅ $1 npm package found${NC}"
        return 0
    fi
}

echo -e "${BLUE}🔍 Checking dependencies...${NC}"
check_dependency npm || exit 1

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install || exit 1
fi

# Check for required npm packages
echo -e "${BLUE}🔍 Checking build tools...${NC}"
check_npm_package electron-builder || exit 1
check_npm_package pkg || exit 1

# Clean and create fresh output directories
echo -e "${BLUE}🧹 Cleaning old build artifacts...${NC}"
rm -rf dist
rm -rf dist-portable
rm -rf dist-pkg
echo -e "${GREEN}✓ Cleaned dist/, dist-portable/, dist-pkg/${NC}"

echo -e "${BLUE}📁 Creating fresh output directories...${NC}"
mkdir -p dist-portable
mkdir -p dist-pkg
echo -e "${GREEN}✓ Created fresh directories${NC}"

echo ""
echo -e "${BLUE}🏗️  Available portable build options:${NC}"
echo "1. Electron Portable (Windows .exe, Linux AppImage, macOS .zip)"
echo "2. PKG Binary (Single executable, all platforms)" 
echo "3. Both (recommended)"
echo "4. Quick portable (current platform only)"

read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo -e "${YELLOW}🔨 Building Electron portable applications...${NC}"
        npm run build-portable
        ;;
    2)
        echo -e "${YELLOW}🔨 Building PKG binary executables...${NC}"
        echo -e "${BLUE}💡 Note: PKG builds create web-server only versions${NC}"
        npm run build-pkg-all || echo -e "${YELLOW}⚠️  PKG build failed, but Electron builds may still work${NC}"
        ;;
    3)
        echo -e "${YELLOW}🔨 Building all portable formats...${NC}"
        echo -e "${BLUE}Building Electron portable...${NC}"
        npm run build-portable
        echo -e "${BLUE}Building PKG binaries (web-server only)...${NC}"
        npm run build-pkg-all || echo -e "${YELLOW}⚠️  PKG build failed, continuing with Electron builds${NC}"
        ;;
    4)
        echo -e "${YELLOW}🔨 Building quick portable for current platform...${NC}"
        # Detect platform and build accordingly
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            npx electron-builder --linux AppImage
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            npx electron-builder --mac zip
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            npx electron-builder --win portable
        else
            echo -e "${RED}❌ Unknown platform, building Linux AppImage...${NC}"
            npx electron-builder --linux AppImage
        fi
        
        # Also build PKG for current platform
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            npx pkg server-only.js --target node18-linux-x64 --out-path dist-pkg/
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            npx pkg server-only.js --target node18-macos-x64 --out-path dist-pkg/
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            npx pkg server-only.js --target node18-win-x64 --out-path dist-pkg/
        else
            npx pkg server-only.js --target node18-linux-x64 --out-path dist-pkg/
        fi
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

# Check build results
echo ""
echo -e "${GREEN}✅ Portable build completed!${NC}"
echo ""
echo -e "${BLUE}📁 Build outputs:${NC}"

if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo -e "${YELLOW}Electron builds (dist/):${NC}"
    ls -la dist/ | grep -E '\.(exe|AppImage|zip|dmg)$' || echo "  No Electron portable files found"
fi

if [ -d "dist-pkg" ] && [ "$(ls -A dist-pkg)" ]; then
    echo -e "${YELLOW}PKG binaries (dist-pkg/):${NC}"
    ls -la dist-pkg/
fi

echo ""
echo -e "${GREEN}🎯 Portable applications ready!${NC}"
echo ""
echo -e "${BLUE}📝 Usage instructions:${NC}"
echo "• Electron portable: Double-click to run, no installation needed"
echo "• PKG binaries: Run from command line, completely self-contained"
echo "• AppImage: Make executable (chmod +x) then run on any Linux"
echo "• Windows portable: Run .exe directly, no admin rights needed"
echo "• macOS zip: Extract and run, may need right-click > Open first time"

# Show file sizes
echo ""
echo -e "${BLUE}📊 File sizes:${NC}"
find dist dist-pkg -name "*.exe" -o -name "*.AppImage" -o -name "*.zip" -o -name "myrient-viewer*" 2>/dev/null | while read file; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "  $file: $size"
    fi
done