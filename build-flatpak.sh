#!/bin/bash

# Flatpak Builder for Myrient Viewer
echo "📦 Building Myrient Viewer Flatpak..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo -e "${RED}❌ Flatpak can only be built on Linux${NC}"
    exit 1
fi

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

echo -e "${BLUE}🔍 Checking dependencies...${NC}"

# Check for required tools
MISSING_DEPS=0

if ! check_dependency flatpak; then
    echo -e "${YELLOW}💡 Install flatpak: sudo apt install flatpak${NC}"
    MISSING_DEPS=1
fi

if ! check_dependency flatpak-builder; then
    echo -e "${YELLOW}💡 Install flatpak-builder: sudo apt install flatpak-builder${NC}"
    MISSING_DEPS=1
fi

if ! check_dependency npm; then
    echo -e "${YELLOW}💡 Install Node.js and npm${NC}"
    MISSING_DEPS=1
fi

if [ $MISSING_DEPS -eq 1 ]; then
    echo -e "${RED}❌ Missing required dependencies. Please install them first.${NC}"
    exit 1
fi

# Check if Flathub runtime is installed
echo -e "${BLUE}🔍 Checking Flatpak runtimes...${NC}"
if ! flatpak list | grep -q "org.freedesktop.Platform.*23.08"; then
    echo -e "${YELLOW}📥 Installing required Flatpak runtime...${NC}"
    flatpak install -y flathub org.freedesktop.Platform//23.08
    flatpak install -y flathub org.freedesktop.Sdk//23.08
fi

if ! flatpak list | grep -q "org.electronjs.Electron2.BaseApp"; then
    echo -e "${YELLOW}📥 Installing Electron base app...${NC}"
    flatpak install -y flathub org.electronjs.Electron2.BaseApp//23.08
fi

# Update version
echo -e "${BLUE}🗓️ Updating version...${NC}"
node update-version.js

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing npm dependencies...${NC}"
    npm install
fi

# Clean and create fresh build directories
echo -e "${BLUE}🧹 Cleaning old Flatpak build artifacts...${NC}"
rm -rf flatpak-build
rm -rf flatpak-repo
rm -f *.flatpak
rm -rf dist
echo -e "${GREEN}✓ Cleaned flatpak-build/, flatpak-repo/, *.flatpak, dist/${NC}"

echo -e "${BLUE}📁 Creating fresh build directories...${NC}"
mkdir -p flatpak-build
mkdir -p flatpak-repo
echo -e "${GREEN}✓ Created fresh directories${NC}"

echo ""
# Choose build method
echo ""
echo -e "${BLUE}🏗️  Flatpak build options:${NC}"
echo "1. Use electron-builder (automated, experimental)"
echo "2. Use AppImage instead (recommended, fully working)"
echo "3. Manual flatpak-builder (advanced, for Flathub submission)"
echo ""
read -p "Choose option (1-3, default 2): " choice
choice=${choice:-2}

case $choice in
    1)
        echo -e "${YELLOW}🔨 Building with electron-builder...${NC}"
        echo -e "${BLUE}⚠️  Note: electron-builder flatpak support is experimental${NC}"
        npm run build-flatpak
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Flatpak build successful!${NC}"
            echo -e "${BLUE}📁 Output location: dist/${NC}"
            ls -lh dist/*.flatpak 2>/dev/null || ls -lh dist/*.flatpakref 2>/dev/null || echo -e "${YELLOW}⚠️  Build completed but no .flatpak found in dist/${NC}"
        else
            echo -e "${RED}❌ electron-builder flatpak build failed${NC}"
            echo -e "${YELLOW}💡 Tip: electron-builder's flatpak support is still experimental${NC}"
            echo -e "${YELLOW}💡 Use option 2 (AppImage) for a working universal Linux binary${NC}"
            echo -e "${YELLOW}💡 Or use option 3 to prepare for Flathub submission${NC}"
            exit 1
        fi
        ;;
    2)
        echo -e "${YELLOW}🔨 Building AppImage (recommended alternative)...${NC}"
        echo -e "${BLUE}AppImage provides similar benefits to Flatpak:${NC}"
        echo -e "  ✅ Universal Linux compatibility"
        echo -e "  ✅ No installation required"
        echo -e "  ✅ Single executable file"
        echo -e "  ✅ All dependencies included"
        echo ""
        npm run build-portable
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ AppImage build successful!${NC}"
            echo -e "${BLUE}📁 Output location: dist/${NC}"
            ls -lh dist/*.AppImage 2>/dev/null
            echo ""
            echo -e "${BLUE}📝 To run the AppImage:${NC}"
            echo -e "  ${YELLOW}chmod +x dist/*.AppImage${NC}"
            echo -e "  ${YELLOW}./dist/*.AppImage${NC}"
        else
            echo -e "${RED}❌ AppImage build failed${NC}"
            exit 1
        fi
        ;;
    3)
        echo -e "${YELLOW}🔨 Preparing Flatpak manifest for Flathub submission...${NC}"
        
        # Make sure we have the manifest
        if [ ! -f "com.myrientviewer.app.yml" ]; then
            echo -e "${RED}❌ Flatpak manifest not found!${NC}"
            exit 1
        fi
        
        echo -e "${BLUE}� Flatpak manifest prepared for Flathub submission${NC}"
        echo ""
        echo -e "${YELLOW}⚠️  Note: Manual flatpak-builder for Electron apps is complex.${NC}"
        echo -e "${YELLOW}   For Flathub submission, you'll need to:${NC}"
        echo ""
        echo -e "  1. Create proper NPM offline cache for dependencies"
        echo -e "  2. Package the Electron app correctly"
        echo -e "  3. Test the build locally"
        echo -e "  4. Submit to Flathub"
        echo ""
        echo -e "${BLUE}� For now, consider these options:${NC}"
        echo -e "  ✅ Distribute AppImage (option 2) - works great for users"
        echo -e "  ✅ Submit a feature request to Flathub after app matures"
        echo -e "  ✅ Use the provided manifest as a starting point"
        echo ""
        echo -e "${BLUE}📁 Files ready for Flathub submission:${NC}"
        echo -e "  - com.myrientviewer.app.yml (manifest)"
        echo -e "  - com.myrientviewer.app.desktop (desktop entry)"
        echo -e "  - com.myrientviewer.app.metainfo.xml (metadata)"
        echo ""
        echo -e "${BLUE}See FLATPAK.md for detailed Flathub submission instructions${NC}"
        ;;
    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Build process complete!${NC}"
echo ""
echo -e "${BLUE}📝 Quick Start:${NC}"
if [ "$choice" = "2" ]; then
    echo -e "  Run AppImage: ${YELLOW}./dist/*.AppImage${NC}"
else
    echo -e "  Install Flatpak: ${YELLOW}flatpak install --user myrient-viewer-*.flatpak${NC}"
    echo -e "  Run: ${YELLOW}flatpak run com.myrientviewer.app${NC}"
fi
echo ""
echo -e "${BLUE}� Documentation:${NC}"
echo -e "  - FLATPAK.md for detailed Flatpak/Flathub guide"
echo -e "  - BUILD_OPTIONS.md for all build formats"
echo -e "  - README.md for general usage"
