#!/bin/bash

# Icon Generator Script for Myrient Viewer
# This script creates simple placeholder icons for the desktop application

echo "🎨 Generating application icons..."

# Check if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found, generating PNG icon..."
    
    # Create a simple 512x512 PNG icon
    convert -size 512x512 xc:'#667eea' \
            \( -size 400x300 xc:'#ffd700' -draw "roundrectangle 0,0 400,300 20,20" \) \
            -gravity center -composite \
            \( -size 320x20 xc:'white' -alpha set -channel A -evaluate set 80% +channel \) \
            -geometry +0+50 -composite \
            \( -size 240x20 xc:'white' -alpha set -channel A -evaluate set 60% +channel \) \
            -geometry +0+80 -composite \
            \( -size 200x20 xc:'white' -alpha set -channel A -evaluate set 40% +channel \) \
            -geometry +0+110 -composite \
            \( -size 60x60 xc:'#4299e1' -draw "circle 30,30 30,10" \) \
            -geometry +320+200 -composite \
            assets/icon.png
    
    echo "✅ PNG icon created at assets/icon.png"
    
    # Create ICO file if possible
    convert assets/icon.png -resize 256x256 assets/icon.ico 2>/dev/null && echo "✅ ICO icon created at assets/icon.ico"
    
else
    echo "⚠️  ImageMagick not found. Creating text-based placeholder..."
    
    # Create a simple text placeholder
    cat > assets/icon.txt << 'EOF'
This directory should contain application icons:
- icon.png (512x512 for Linux)
- icon.ico (multi-size for Windows) 
- icon.icns (for macOS)

To generate real icons:
1. Install ImageMagick: sudo apt install imagemagick
2. Run this script again
3. Or create custom icons using design software

For now, the application will use default Electron icons.
EOF

    echo "📝 Created placeholder file at assets/icon.txt"
fi

echo ""
echo "🎯 Icon generation complete!"
echo "📁 Files in assets directory:"
ls -la assets/