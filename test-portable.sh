#!/bin/bash

# Quick Portable Test Launcher
echo "🧪 Testing Portable Builds..."

# Check if builds exist
ELECTRON_BUILDS_EXIST=false
PKG_BUILDS_EXIST=false

if [ -d "dist" ] && [ "$(ls -A dist 2>/dev/null)" ]; then
    ELECTRON_BUILDS_EXIST=true
fi

if [ -d "dist-pkg" ] && [ "$(ls -A dist-pkg 2>/dev/null)" ]; then
    PKG_BUILDS_EXIST=true
fi

if [ "$ELECTRON_BUILDS_EXIST" = false ] && [ "$PKG_BUILDS_EXIST" = false ]; then
    echo "❌ No portable builds found!"
    echo ""
    echo "🏗️  Build portable applications first:"
    echo "   ./build-portable.sh"
    exit 1
fi

echo "📋 Available portable builds:"
echo ""

if [ "$ELECTRON_BUILDS_EXIST" = true ]; then
    echo "🖥️  Electron Builds (dist/):"
    ls dist/ | grep -E '\.(exe|AppImage|zip|dmg)$' | while read file; do
        echo "   - $file"
    done
fi

if [ "$PKG_BUILDS_EXIST" = true ]; then
    echo "⚡ PKG Binaries (dist-pkg/):"
    ls dist-pkg/ | while read file; do
        echo "   - $file"
    done
fi

echo ""
echo "🚀 Launch options:"

# Auto-detect and offer to launch the appropriate build for current platform
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if [ -f "dist-pkg/myrient-viewer-linux" ]; then
        echo "1. Launch PKG binary (Linux)"
    fi
    
    APPIMAGE_FILE=$(find dist -name "*.AppImage" 2>/dev/null | head -n1)
    if [ -n "$APPIMAGE_FILE" ]; then
        echo "2. Launch AppImage ($APPIMAGE_FILE)"
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [ -f "dist-pkg/myrient-viewer-macos" ]; then
        echo "1. Launch PKG binary (macOS)"
    fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    if [ -f "dist-pkg/myrient-viewer-win.exe" ]; then
        echo "1. Launch PKG binary (Windows)"
    fi
    
    PORTABLE_EXE=$(find dist -name "*portable*.exe" 2>/dev/null | head -n1)
    if [ -n "$PORTABLE_EXE" ]; then
        echo "2. Launch Electron portable ($PORTABLE_EXE)"
    fi
fi

echo "3. Show all files"
echo "4. Exit"

read -p "Choose option: " choice

case $choice in
    1)
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            if [ -f "dist-pkg/myrient-viewer-linux" ]; then
                chmod +x "dist-pkg/myrient-viewer-linux"
                echo "🚀 Launching PKG binary..."
                ./dist-pkg/myrient-viewer-linux
            fi
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            if [ -f "dist-pkg/myrient-viewer-macos" ]; then
                chmod +x "dist-pkg/myrient-viewer-macos"
                echo "🚀 Launching PKG binary..."
                ./dist-pkg/myrient-viewer-macos
            fi
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            if [ -f "dist-pkg/myrient-viewer-win.exe" ]; then
                echo "🚀 Launching PKG binary..."
                ./dist-pkg/myrient-viewer-win.exe
            fi
        fi
        ;;
    2)
        if [[ "$OSTYPE" == "linux-gnu"* ]] && [ -n "$APPIMAGE_FILE" ]; then
            chmod +x "$APPIMAGE_FILE"
            echo "🚀 Launching AppImage..."
            ./"$APPIMAGE_FILE"
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]] && [ -n "$PORTABLE_EXE" ]; then
            echo "🚀 Launching Electron portable..."
            ./"$PORTABLE_EXE"
        fi
        ;;
    3)
        echo ""
        echo "📁 All portable files:"
        find dist dist-pkg -type f 2>/dev/null | while read file; do
            size=$(du -h "$file" 2>/dev/null | cut -f1)
            echo "   $file ($size)"
        done
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac