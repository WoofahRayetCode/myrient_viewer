# Myrient Viewer

A modern Node.js application for browsing and managing downloads from the [Myrient](https://myrient.erista.me/files/) file archive, with a focus on retro gaming content.

## Features

- 🗂️ **Browse Myrient directory structure** - Navigate through folders like a file manager
- 📋 **Queue management** - Add multiple files to a download queue
- 📥 **Export download scripts** - Generate curl scripts or JSON/URL lists
- 🔍 **Search and filter** - Find files quickly within directories
- 🎮 **ROM-aware** - Recognizes game files, archives, and retro formats
- 📱 **Responsive UI** - Works great on desktop and mobile
- 🖥️ **Multiple deployment options** - Desktop app, web browser, or Flatpak
- ⚡ **Fast parsing** - Efficient directory listing processing

## Installation & Usage

### Quick Start

#### Option 1: Desktop Application (Recommended)

```bash
# Clone the repository
git clone https://github.com/WoofahRayetCode/myrient_viewer.git
cd myrient_viewer

# Quick setup and launch
./setup
./launch-desktop
```

The desktop app launches automatically with native menus and keyboard shortcuts.

#### Option 2: Web Application

```bash
# Setup and start the server
./setup
npm start
```

Then open your browser to `http://localhost:3000`

### System Requirements

- **Node.js** v18 or higher
- **npm** (included with Node.js)
- For building: Additional platform-specific tools (see Building section)

## Usage Guide

1. **Browse**: Click folder names to navigate through Myrient's archive
2. **Add to Queue**: Click the + button next to files you want
3. **Manage Queue**: Use the Queue button in the header to view selections
4. **Export**: Generate curl scripts, JSON lists, or URL files
5. **Search**: Filter files in the current directory with the search box

### Desktop App Keyboard Shortcuts

- `Ctrl+H` / `Cmd+H` - Navigate to home directory
- `Ctrl+B` / `Cmd+B` - Go back one directory
- `F5` - Refresh current directory
- `Ctrl+K` / `Cmd+K` - Focus search box
- `Ctrl+Q` / `Cmd+Q` - View download queue
- `F12` - Toggle Developer Tools

## Development

### Available Scripts

```bash
npm start              # Start web server (port 3000)
npm run dev            # Development mode with auto-reload
npm run electron       # Run as desktop application
npm run electron-dev   # Desktop dev mode with DevTools
npm run clean          # Clean all build artifacts
```

### Project Structure

```
myrient_viewer/
├── main.js              # Electron main process
├── preload.js           # Electron preload script
├── server.js            # Express web server
├── server-only.js       # Standalone server (for PKG builds)
├── package.json         # Project configuration
├── public/              # Web UI files
│   ├── index.html       # Main HTML
│   ├── app.js           # Frontend JavaScript
│   └── styles.css       # Styling
├── services/            # Backend services
│   ├── myrientService.js    # Myrient API wrapper
│   └── queueService.js      # Queue management
├── scripts/
│   ├── build/           # Build scripts
│   ├── setup/           # Setup scripts
│   └── launch-desktop.sh    # Desktop launcher
├── flatpak/             # Flatpak configuration
└── assets/              # Icons and resources
```

### Making Changes

1. **Web UI**: Edit files in `public/` directory
2. **Backend**: Modify `server.js` and files in `services/`
3. **Desktop**: Update `main.js` or `preload.js`
4. **Test changes**: Run `npm run dev` or `npm run electron-dev`

## Building

### Portable Builds

Build portable applications that run without installation:

```bash
./build-portable       # Interactive builder (Electron)
./build-flatpak        # Interactive builder (Flatpak)
```

Or use npm scripts:

```bash
npm run build-portable     # Electron portable (all platforms)
npm run build-flatpak      # Flatpak package
npm run build-pkg-all      # PKG standalone binaries (experimental)
```

### Build Output Formats

| Format | Platforms | Size | Status | Notes |
|--------|-----------|------|--------|-------|
| **Electron Portable** | Windows `.exe`<br>Linux `.AppImage`<br>macOS `.zip` | ~100MB | ✅ Working | Full features, no installation required |
| **Flatpak** | Linux | ~100MB | ✅ Working | Universal Linux package, sandboxed |
| **PKG Binary** | All platforms | ~50MB | ⚠️ Experimental | Ultra-compact, may have dependency issues |

### Build Output Locations

- **Electron builds**: `dist-portable/myrient-viewer-{version}-{platform}`
- **Flatpak builds**: `flatpak-build/` and `*.flatpak` file
- **PKG builds**: `dist-pkg/myrient-viewer-{version}-{platform}`

### Platform-Specific Build Requirements

#### Windows
- No additional requirements (cross-platform builds supported)

#### macOS
- Xcode Command Line Tools (for building on macOS)
- For cross-platform builds: Use Linux or macOS host

#### Linux
- Standard build tools: `build-essential`
- For Flatpak: `flatpak` and `flatpak-builder`

```bash
# Ubuntu/Debian
sudo apt install flatpak flatpak-builder

# Fedora
sudo dnf install flatpak flatpak-builder
```

### Installing Flatpak Builds

```bash
# Install locally built Flatpak
flatpak install --user myrient-viewer-*.flatpak

# Run the application
flatpak run com.myrientviewer.app

# Uninstall
flatpak uninstall com.myrientviewer.app
```

## API Reference

The server exposes these REST endpoints:

### Browse & Navigation
- `GET /api/browse/:path*` - Browse Myrient directory at path
- Response: `{ files: [...], folders: [...], currentPath: "..." }`

### Queue Management
- `GET /api/queue` - Get current download queue
- `POST /api/queue/add` - Add file to queue
  - Body: `{ name, url, size }`
- `DELETE /api/queue/:id` - Remove file from queue
- `POST /api/queue/clear` - Clear entire queue

### Export
- `GET /api/queue/export/json` - Export queue as JSON
- `GET /api/queue/export/curl` - Export as curl download script
- `GET /api/queue/export/urls` - Export as plain URL list

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit: `git commit -am 'Add feature description'`
5. Push: `git push origin feature-name`
6. Open a Pull Request

### Coding Guidelines

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Test in both web and desktop modes
- Update documentation for new features

## Troubleshooting

### Common Issues

**Desktop app won't start**
- Ensure Node.js v18+ is installed: `node --version`
- Try: `npm install` to reinstall dependencies
- Check: `npm run electron-dev` for error messages

**Web server port conflict**
- The app uses port 3000 by default
- Change in `server.js` or set `PORT` environment variable

**Build failures**
- Run `npm run clean` to remove old build artifacts
- Ensure you have required build tools installed
- Check `package.json` scripts for specific requirements

**Flatpak build issues**
- Ensure `flatpak` and `flatpak-builder` are installed
- Add Flathub runtime: `flatpak install flathub org.freedesktop.Platform//23.08`

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/WoofahRayetCode/myrient_viewer/issues)
- **Discussions**: Open a discussion on GitHub
- **Documentation**: Check this README and inline code comments

## License

MIT License - see LICENSE file for details

## Author

**Eric Parsley (WoofahRayetCode)**

- GitHub: [@WoofahRayetCode](https://github.com/WoofahRayetCode)
- Project: [myrient_viewer](https://github.com/WoofahRayetCode/myrient_viewer)

## Acknowledgments

- [Myrient](https://myrient.erista.me/) - For providing the file archive
- [Electron](https://www.electronjs.org/) - Desktop application framework
- [Express](https://expressjs.com/) - Web server framework
- [Cheerio](https://cheerio.js.org/) - HTML parsing

## Changelog

### 2025.10.24
- Project reorganization: Moved scripts to organized directories
- Added Flatpak build support with full configuration
- Simplified download exports (curl only)
- Added build cleaning scripts
- Enhanced .gitignore patterns
- Updated author information

### Earlier Versions
- Initial release with web and desktop modes
- Queue management system
- Export functionality (wget/curl/json)
- Search and filtering
- Responsive UI design
