# Icon Generation Instructions

This directory should contain the application icons for different platforms:

## Required Files:
- `icon.png` - 512x512 PNG for Linux
- `icon.ico` - Windows ICO file (16, 24, 32, 48, 64, 128, 256 sizes)
- `icon.icns` - macOS ICNS file

## Generate Icons:
You can create these from a high-resolution PNG (1024x1024) using tools like:

### Online Tools:
- https://www.icoconverter.com/ (PNG to ICO)
- https://iconverticons.com/online/ (PNG to ICNS)

### Command Line Tools:
```bash
# Install imagemagick for PNG/ICO
sudo apt install imagemagick  # Ubuntu/Debian
brew install imagemagick      # macOS

# Generate ICO file
convert icon.png -resize 256x256 -compress zip icon.ico

# For ICNS on macOS
npm install -g png2icons
png2icons icon.png ./
```

## Temporary Icon
For now, a basic 512x512 PNG file is included as a placeholder.
Replace with your custom icon design.

## Icon Design Tips:
- Use a simple, recognizable design
- Test at small sizes (16x16, 24x24)
- Ensure good contrast
- Consider the folder/file theme for Myrient Viewer