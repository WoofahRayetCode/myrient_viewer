# Myrient Viewer# Myrient Viewer



A modern Node.js application for browsing and managing downloads from the [Myrient](https://myrient.erista.me/files/) file archive, with a focus on retro gaming content.A Node.js application for browsing the [Myrient](https://myrient.erista.me/files/) file structure and managing download queues.



## ✨ Features## Features



- 🗂️ **Browse Myrient directory structure** - Navigate through folders like a file manager- 🗂️ **Browse Myrient directory structure** - Navigate through folders just like a file manager

- 📋 **Queue management** - Add multiple files to a download queue- 📋 **Queue files for downloading** - Add files to a download queue for batch processing

- 📥 **Export download scripts** - Generate curl scripts or JSON/URL lists- 📥 **Export download scripts** - Generate wget/curl scripts or JSON lists

- 🔍 **Search and filter** - Find files quickly within directories- 🔍 **Search and filter files** - Find files quickly within directories

- 🎮 **ROM-aware** - Recognizes game files, archives, and retro formats- 📱 **Responsive web interface** - Works great on desktop and mobile

- 📱 **Responsive UI** - Works great on desktop and mobile- ⚡ **Fast directory parsing** - Efficient HTML parsing of Myrient's directory listings

- 🖥️ **Multiple deployment options** - Desktop app, web browser, or Flatpak- 🎮 **ROM-aware file types** - Recognizes game files, archives, and other retro formats

- ⚡ **Fast parsing** - Efficient directory listing processing- 📦 **Portable deployment** - Run from single executable file, no installation needed

- 🖥️ **Multiple run modes** - Web browser, desktop app, or standalone binary

## 📦 Installation & Usage

## Screenshots

### Quick Start

The app provides a clean, modern interface for browsing Myrient's extensive collection of retro game files, allowing you to queue up downloads and export them as scripts for later use.

#### Option 1: Desktop Application (Recommended)

## Getting Started

```bash

# Clone the repository### Prerequisites

git clone https://github.com/WoofahRayetCode/myrient_viewer.git

cd myrient_viewer- Node.js (v18 or higher) - Download from [nodejs.org](https://nodejs.org/)

- npm (usually comes with Node.js)

# Quick setup and launch

./setup### Installation Options

./launch-desktop

```#### Option 1: Desktop Application (Recommended)



The desktop app launches automatically with native menus and keyboard shortcuts.Run as a standalone desktop application with native menus and better integration:



#### Option 2: Web Application1. **Clone or download this repository**



```bash2. **Launch the desktop app**:

# Setup and start the server   ```bash

./setup   ./launch-desktop.sh

npm start   ```

```   

   **Or manually**:

Then open your browser to `http://localhost:3000`   ```bash

   npm install

### System Requirements   npm run electron

   ```

- **Node.js** v18 or higher

- **npm** (included with Node.js)3. **The desktop app will open automatically** - no browser needed!

- For building: Additional platform-specific tools (see [Building](#building))

#### Option 2: Web Application

## 🎯 Usage Guide

Run in your browser for a lightweight experience:

1. **Browse**: Click folder names to navigate through Myrient's archive

2. **Add to Queue**: Click the + button next to files you want1. **Run the setup script**:

3. **Manage Queue**: Use the Queue button in the header to view selections   ```bash

4. **Export**: Generate curl scripts, JSON lists, or URL files   ./setup.sh

5. **Search**: Filter files in the current directory with the search box   ```



### Desktop App Keyboard Shortcuts2. **Start the server**:

   ```bash

- `Ctrl+H` / `Cmd+H` - Navigate to home directory   npm start

- `Ctrl+B` / `Cmd+B` - Go back one directory   ```

- `F5` - Refresh current directory

- `Ctrl+K` / `Cmd+K` - Focus search box3. **Open your browser** to `http://localhost:3000`

- `Ctrl+Q` / `Cmd+Q` - View download queue

- `F12` - Toggle Developer Tools### Development



## 🔧 Development- **Web development**: `npm run dev` (auto-reload web server)

- **Desktop development**: `npm run electron-dev` (dev mode with DevTools)

### Available Scripts- **Build desktop apps**: `npm run build-desktop` (current platform)

- **Build for all platforms**: `npm run build-desktop-all` (Windows, macOS, Linux)

```bash

npm start              # Start web server (port 3000)## Usage

npm run dev            # Development mode with auto-reload

npm run electron       # Run as desktop application1. **Browse directories**: Click on folder names to navigate

npm run electron-dev   # Desktop dev mode with DevTools2. **Add to queue**: Click the + button next to files you want to download

npm run clean          # Clean all build artifacts3. **Manage queue**: Use the Queue button in the header to view/manage your selections

```4. **Export downloads**: Choose from wget script, curl script, or JSON export

5. **Search files**: Use the search box to filter files in the current directory

### Project Structure

### Desktop Application Features

```

myrient_viewer/- **Native menus**: File, Edit, View, Navigate, Window, and Help menus

├── main.js              # Electron main process- **Keyboard shortcuts**: 

├── preload.js           # Electron preload script  - `Ctrl+H` / `Cmd+H` - Go to home directory

├── server.js            # Express web server  - `F5` - Refresh current directory

├── server-only.js       # Standalone server (for PKG builds)  - `Ctrl+K` / `Cmd+K` - Focus search box

├── package.json         # Project configuration  - `F12` - Toggle Developer Tools

├── public/              # Web UI files- **Window management**: Minimize, maximize, close with native controls

│   ├── index.html       # Main HTML- **Better integration**: Appears in taskbar/dock, respects system theme

│   ├── app.js           # Frontend JavaScript

│   └── styles.css       # Styling### Building Desktop Applications

├── services/            # Backend services

│   ├── myrientService.js    # Myrient API wrapper#### Standard Desktop Builds

│   └── queueService.js      # Queue management```bash

├── scripts/./build-desktop.sh           # Standard installers

│   ├── build/           # Build scriptsnpm run build-desktop-all    # Windows, macOS, and Linux

│   ├── setup/           # Setup scripts```

│   └── launch-desktop.sh    # Desktop launcher

├── flatpak/             # Flatpak configuration#### 📦 **Portable Applications (No Installation Required)**

└── assets/              # Icons and resources

```**Quick Build:**

```bash

### Making Changes./demo-electron.sh           # Quick Electron portable demo

./build-portable.sh          # Interactive portable builder (all formats)

1. **Web UI**: Edit files in `public/` directory```

2. **Backend**: Modify `server.js` and files in `services/`

3. **Desktop**: Update `main.js` or `preload.js`**Manual Build Commands:**

4. **Test changes**: Run `npm run dev` or `npm run electron-dev````bash

# Electron Portable (Recommended - Working!)

## 🏗️ Buildingnpm run build-portable       # Windows .exe, Linux AppImage, macOS .zip



### Portable Builds (Single-file Distribution)# PKG Binary (Experimental)  

npm run build-pkg-all        # Single executables (may have dependency issues)

Build portable applications that run without installation:

# Test built applications

```bash./test-portable.sh           # Launch portable builds

./build-portable       # Interactive builder (Electron)```

./build-flatpak        # Interactive builder (Flatpak)

```#### **🎯 Portable Options Explained**



Or use npm scripts:| Type | Format | Size | Status | Pros | Cons |

|------|--------|------|--------|------|------|

```bash| **Electron Portable** | `.exe`, `.AppImage`, `.zip` | ~100MB | ✅ **Working** | Full desktop features, no installation | Larger file size |

npm run build-portable     # Electron portable (all platforms)| **Flatpak** | `.flatpak` | ~100MB | ✅ **Working** | Linux universal, sandboxed, Flathub support | Linux only |

npm run build-flatpak      # Flatpak package| **PKG Binary** | Single executable | ~50MB | ⚠️ **Experimental** | Ultra-compact, instant startup | Dependency issues, web-only |

npm run build-pkg-all      # PKG standalone binaries (experimental)| **AppImage** | `.AppImage` | ~100MB | ✅ **Working** | Linux universal, no dependencies | Linux only |

```

#### **🐧 Flatpak Build (Linux)**

### Build Output FormatsBuild Flatpak package for distribution on Flathub or direct installation:

```bash

| Format | Platforms | Size | Status | Notes |./build-flatpak.sh           # Interactive Flatpak builder

|--------|-----------|------|--------|-------|npm run build-flatpak        # Build with electron-builder

| **Electron Portable** | Windows `.exe`<br>Linux `.AppImage`<br>macOS `.zip` | ~100MB | ✅ Working | Full features, no installation required |```

| **Flatpak** | Linux | ~100MB | ✅ Working | Universal Linux package, sandboxed |

| **PKG Binary** | All platforms | ~50MB | ⚠️ Experimental | Ultra-compact, may have dependency issues |See [FLATPAK.md](FLATPAK.md) for detailed Flatpak build and distribution guide.



### Build Output Locations**Installing Flatpak:**

```bash

- **Electron builds**: `dist-portable/myrient-viewer-{version}-{platform}`flatpak install myrient-viewer-*.flatpak

- **Flatpak builds**: `flatpak-build/` and `*.flatpak` fileflatpak run com.myrientviewer.app

- **PKG builds**: `dist-pkg/myrient-viewer-{version}-{platform}````



### Platform-Specific Build Requirements#### **📁 Output Locations**

- **Standard builds**: `dist/` directory

#### Windows- **Portable builds**: `dist/` and `dist-pkg/` directories

- No additional requirements (cross-platform builds supported)- **All builds**: Can be distributed as single files



#### macOS## API Endpoints

- Xcode Command Line Tools (for building on macOS)

- For cross-platform builds: Use Linux or macOS host- `GET /api/browse/:path*` - Browse Myrient directory

- `POST /api/queue/add` - Add file to download queue

#### Linux- `DELETE /api/queue/:id` - Remove file from queue

- Standard build tools: `build-essential`- `GET /api/queue` - Get current queue

- For Flatpak: `flatpak` and `flatpak-builder`- `GET /api/queue/export/:format` - Export queue (json, wget, curl)



```bash## License

# Ubuntu/Debian

sudo apt install flatpak flatpak-builderMIT

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

## 🔌 API Reference

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

## 🤝 Contributing

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

## 🐛 Troubleshooting

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

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 👤 Author

**Eric Parsley (WoofahRayetCode)**

- GitHub: [@WoofahRayetCode](https://github.com/WoofahRayetCode)
- Project: [myrient_viewer](https://github.com/WoofahRayetCode/myrient_viewer)

## 🙏 Acknowledgments

- [Myrient](https://myrient.erista.me/) - For providing the file archive
- [Electron](https://www.electronjs.org/) - Desktop application framework
- [Express](https://expressjs.com/) - Web server framework
- [Cheerio](https://cheerio.js.org/) - HTML parsing

## 📝 Changelog

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
