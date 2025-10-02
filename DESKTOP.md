# Myrient Viewer - Desktop Application Development Guide

## Overview

Myrient Viewer now supports running as both a web application and a standalone desktop application using Electron. This guide covers the desktop application setup, development, and distribution.

## Architecture

### Dual Mode Operation
- **Web Mode**: Traditional Express server accessed via browser
- **Desktop Mode**: Electron wrapper around the same Express server

### Key Files
- `main.js` - Electron main process (window management, menus)
- `server.js` - Express server (modified to detect Electron mode)
- `package.json` - Updated with Electron dependencies and build scripts

## Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies (includes Electron)
npm install

# Generate application icons (optional)
./generate-icons.sh
```

### 2. Development Modes

#### Web Development
```bash
npm run dev                    # Auto-reload web server
# Then open http://localhost:3000 in browser
```

#### Desktop Development
```bash
npm run electron-dev           # Launch with DevTools open
# OR
ELECTRON_IS_DEV=1 npm run electron  # Manual dev mode
```

### 3. Testing

```bash
# Test web version
npm start
./test.sh

# Test desktop version
npm run electron
```

## Building Desktop Applications

### Build for Current Platform
```bash
npm run pack-desktop           # Unpacked (for testing)
npm run build-desktop         # Packaged installer
./build-desktop.sh            # Script wrapper
```

### Build for All Platforms
```bash
npm run build-desktop-all     # Windows, macOS, Linux
```

### Build Outputs
All builds are created in the `dist/` directory:
- **Linux**: `.AppImage`, `.deb`, `.rpm`
- **Windows**: `.exe` installer, portable `.exe`
- **macOS**: `.dmg`, `.zip`

## Desktop-Specific Features

### Native Menus
The desktop app includes native application menus:
- **File**: Clear Queue, Quit
- **Edit**: Standard editing operations
- **View**: Reload, DevTools, Zoom
- **Navigate**: Back/Forward, Home, Refresh
- **Window**: Minimize, Close, Front (macOS)
- **Help**: About, Visit Myrient, DevTools

### Keyboard Shortcuts
- `Ctrl/Cmd + H` - Go to home directory
- `F5` - Refresh current directory  
- `Ctrl/Cmd + K` - Focus search box
- `F12` - Toggle Developer Tools
- `Ctrl/Cmd + Left/Right` - Navigate back/forward

### Window Management
- Minimum size: 1000x700
- Default size: 1400x900
- Remembers window state
- Platform-appropriate title bar style

## Configuration

### Electron Builder Settings
Located in `package.json` under the `build` key:

```json
{
  "build": {
    "appId": "com.myrientviewer.app",
    "productName": "Myrient Viewer",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "server.js", 
      "services/**/*",
      "public/**/*",
      "package.json"
    ]
  }
}
```

### Icons
Place icons in the `assets/` directory:
- `icon.png` - 512x512 for Linux
- `icon.ico` - Multi-size for Windows
- `icon.icns` - For macOS

Use `./generate-icons.sh` to create basic placeholders.

## Server Modifications

The Express server detects when running in Electron mode:

```javascript
const isElectronMode = process.env.ELECTRON_MODE === '1';
```

**Desktop mode changes**:
- Different console messages
- Graceful shutdown handling
- API endpoint (`/api/info`) returns desktop status
- Frontend shows desktop indicator

## Distribution

### Automatic Updates (Future)
Electron Builder supports automatic updates. To enable:
1. Configure update server
2. Add update checking code to `main.js`
3. Build with update configuration

### Manual Distribution
Built applications can be distributed directly:
- Upload to GitHub Releases
- Host on your own server
- Distribute via package managers (Snap, Homebrew, Chocolatey)

## Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
```

#### Icons Not Showing
```bash
# Generate or replace icons
./generate-icons.sh
# OR manually create icons in assets/ directory
```

#### Server Won't Start in Desktop Mode
```bash
# Check if port is available
lsof -i :3000
# OR set custom port
PORT=3001 npm run electron
```

#### DevTools Won't Open
- Use `F12` or menu item
- For persistent DevTools: `npm run electron-dev`

### Platform-Specific Notes

#### Linux
- Requires X11 or Wayland display server
- Some distributions may need additional libraries

#### Windows  
- Windows Defender might flag the executable
- Code signing recommended for production

#### macOS
- Requires notarization for Gatekeeper
- May need Rosetta on Apple Silicon for some dependencies

## Security Considerations

### Content Security Policy
- `nodeIntegration: false` - Prevents Node access in renderer
- `contextIsolation: true` - Isolates contexts
- `webSecurity: true` - Enables web security

### External Links
All external links open in the system default browser, not within the app.

### Local Server
The internal Express server only binds to localhost and is not accessible externally.

## Performance Optimization

### Bundle Size
Only essential files are included in the build:
- Main application files
- Public assets
- Required dependencies
- Excludes development tools and tests

### Memory Usage
- Server runs in separate process
- Graceful cleanup on app quit
- No memory leaks in normal operation

### Startup Time
- Server starts asynchronously
- Window shows loading state
- 2-second delay before loading URL (allows server startup)

## Future Enhancements

### Planned Features
- [ ] Auto-updater integration
- [ ] System tray integration
- [ ] Download progress in taskbar
- [ ] Native notifications
- [ ] Multi-window support
- [ ] Offline queue management

### Architecture Improvements
- [ ] IPC communication between main/renderer
- [ ] Persistent settings storage
- [ ] Background download processing
- [ ] Plugin system