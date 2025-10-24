# Myrient Viewer# Myrient Viewer# Myrient Viewer



A modern Node.js application for browsing and managing downloads from the [Myrient](https://myrient.erista.me/files/) file archive, with a focus on retro gaming content.



## ✨ FeaturesA modern Node.js application for browsing and managing downloads from the [Myrient](https://myrient.erista.me/files/) file archive, with a focus on retro gaming content.A Node.js application for browsing the [Myrient](https://myrient.erista.me/files/) file structure and managing download queues.



- 🗂️ **Browse Myrient directory structure** - Navigate through folders like a file manager

- 📋 **Queue management** - Add multiple files to a download queue

- 📥 **Export download scripts** - Generate curl scripts or JSON/URL lists## ✨ Features## Features

- 🔍 **Search and filter** - Find files quickly within directories

- 🎮 **ROM-aware** - Recognizes game files, archives, and retro formats

- 📱 **Responsive UI** - Works great on desktop and mobile

- 🖥️ **Multiple deployment options** - Desktop app, web browser, or Flatpak- 🗂️ **Browse Myrient directory structure** - Navigate through folders like a file manager- 🗂️ **Browse Myrient directory structure** - Navigate through folders just like a file manager

- ⚡ **Fast parsing** - Efficient directory listing processing

- 📋 **Queue management** - Add multiple files to a download queue- 📋 **Queue files for downloading** - Add files to a download queue for batch processing

## 📦 Installation & Usage

- 📥 **Export download scripts** - Generate curl scripts or JSON/URL lists- 📥 **Export download scripts** - Generate wget/curl scripts or JSON lists

### Quick Start

- 🔍 **Search and filter** - Find files quickly within directories- 🔍 **Search and filter files** - Find files quickly within directories

#### Option 1: Desktop Application (Recommended)

- 🎮 **ROM-aware** - Recognizes game files, archives, and retro formats- 📱 **Responsive web interface** - Works great on desktop and mobile

```bash

# Clone the repository- 📱 **Responsive UI** - Works great on desktop and mobile- ⚡ **Fast directory parsing** - Efficient HTML parsing of Myrient's directory listings

git clone https://github.com/WoofahRayetCode/myrient_viewer.git

cd myrient_viewer- 🖥️ **Multiple deployment options** - Desktop app, web browser, or Flatpak- 🎮 **ROM-aware file types** - Recognizes game files, archives, and other retro formats



# Quick setup and launch- ⚡ **Fast parsing** - Efficient directory listing processing- 📦 **Portable deployment** - Run from single executable file, no installation needed

./setup

./launch-desktop- 🖥️ **Multiple run modes** - Web browser, desktop app, or standalone binary

```

## 📦 Installation & Usage

The desktop app launches automatically with native menus and keyboard shortcuts.

## Screenshots

#### Option 2: Web Application

### Quick Start

```bash

# Setup and start the serverThe app provides a clean, modern interface for browsing Myrient's extensive collection of retro game files, allowing you to queue up downloads and export them as scripts for later use.

./setup

npm start#### Option 1: Desktop Application (Recommended)

```

## Getting Started

Then open your browser to `http://localhost:3000`

```bash

### System Requirements

# Clone the repository### Prerequisites

- **Node.js** v18 or higher

- **npm** (included with Node.js)git clone https://github.com/WoofahRayetCode/myrient_viewer.git

- For building: Additional platform-specific tools (see [Building](#building))

cd myrient_viewer- Node.js (v18 or higher) - Download from [nodejs.org](https://nodejs.org/)

## 🎯 Usage Guide

- npm (usually comes with Node.js)

1. **Browse**: Click folder names to navigate through Myrient's archive

2. **Add to Queue**: Click the + button next to files you want# Quick setup and launch

3. **Manage Queue**: Use the Queue button in the header to view selections

4. **Export**: Generate curl scripts, JSON lists, or URL files./setup### Installation Options

5. **Search**: Filter files in the current directory with the search box

./launch-desktop

### Desktop App Keyboard Shortcuts

```#### Option 1: Desktop Application (Recommended)

- `Ctrl+H` / `Cmd+H` - Navigate to home directory

- `Ctrl+B` / `Cmd+B` - Go back one directory

- `F5` - Refresh current directory

- `Ctrl+K` / `Cmd+K` - Focus search boxThe desktop app launches automatically with native menus and keyboard shortcuts.Run as a standalone desktop application with native menus and better integration:

- `Ctrl+Q` / `Cmd+Q` - View download queue

- `F12` - Toggle Developer Tools



## 🔧 Development#### Option 2: Web Application1. **Clone or download this repository**



### Available Scripts



```bash```bash2. **Launch the desktop app**:

npm start              # Start web server (port 3000)

npm run dev            # Development mode with auto-reload# Setup and start the server   ```bash

npm run electron       # Run as desktop application

npm run electron-dev   # Desktop dev mode with DevTools./setup   ./launch-desktop.sh

npm run clean          # Clean all build artifacts

```npm start   ```



### Project Structure```   



```   **Or manually**:

myrient_viewer/

├── main.js              # Electron main processThen open your browser to `http://localhost:3000`   ```bash

├── preload.js           # Electron preload script

├── server.js            # Express web server   npm install

├── server-only.js       # Standalone server (for PKG builds)

├── package.json         # Project configuration### System Requirements   npm run electron

├── public/              # Web UI files

│   ├── index.html       # Main HTML   ```

│   ├── app.js           # Frontend JavaScript

│   └── styles.css       # Styling- **Node.js** v18 or higher

├── services/            # Backend services

│   ├── myrientService.js    # Myrient API wrapper- **npm** (included with Node.js)3. **The desktop app will open automatically** - no browser needed!

│   └── queueService.js      # Queue management

├── scripts/- For building: Additional platform-specific tools (see [Building](#building))

│   ├── build/           # Build scripts

│   ├── setup/           # Setup scripts#### Option 2: Web Application

│   └── launch-desktop.sh    # Desktop launcher

├── flatpak/             # Flatpak configuration## 🎯 Usage Guide

└── assets/              # Icons and resources

```Run in your browser for a lightweight experience:



### Making Changes1. **Browse**: Click folder names to navigate through Myrient's archive



1. **Web UI**: Edit files in `public/` directory2. **Add to Queue**: Click the + button next to files you want1. **Run the setup script**:

2. **Backend**: Modify `server.js` and files in `services/`

3. **Desktop**: Update `main.js` or `preload.js`3. **Manage Queue**: Use the Queue button in the header to view selections   ```bash

4. **Test changes**: Run `npm run dev` or `npm run electron-dev`

4. **Export**: Generate curl scripts, JSON lists, or URL files   ./setup.sh

## 🏗️ Building

5. **Search**: Filter files in the current directory with the search box   ```

### Portable Builds (Single-file Distribution)



Build portable applications that run without installation:

### Desktop App Keyboard Shortcuts2. **Start the server**:

```bash

./build-portable       # Interactive builder (Electron)   ```bash

./build-flatpak        # Interactive builder (Flatpak)

```- `Ctrl+H` / `Cmd+H` - Navigate to home directory   npm start



Or use npm scripts:- `Ctrl+B` / `Cmd+B` - Go back one directory   ```



```bash- `F5` - Refresh current directory

npm run build-portable     # Electron portable (all platforms)

npm run build-flatpak      # Flatpak package- `Ctrl+K` / `Cmd+K` - Focus search box3. **Open your browser** to `http://localhost:3000`

npm run build-pkg-all      # PKG standalone binaries (experimental)

```- `Ctrl+Q` / `Cmd+Q` - View download queue



### Build Output Formats- `F12` - Toggle Developer Tools### Development



| Format | Platforms | Size | Status | Notes |

|--------|-----------|------|--------|-------|

| **Electron Portable** | Windows `.exe`<br>Linux `.AppImage`<br>macOS `.zip` | ~100MB | ✅ Working | Full features, no installation required |## 🔧 Development- **Web development**: `npm run dev` (auto-reload web server)

| **Flatpak** | Linux | ~100MB | ✅ Working | Universal Linux package, sandboxed |

| **PKG Binary** | All platforms | ~50MB | ⚠️ Experimental | Ultra-compact, may have dependency issues |- **Desktop development**: `npm run electron-dev` (dev mode with DevTools)



### Build Output Locations### Available Scripts- **Build desktop apps**: `npm run build-desktop` (current platform)



- **Electron builds**: `dist-portable/myrient-viewer-{version}-{platform}`- **Build for all platforms**: `npm run build-desktop-all` (Windows, macOS, Linux)

- **Flatpak builds**: `flatpak-build/` and `*.flatpak` file

- **PKG builds**: `dist-pkg/myrient-viewer-{version}-{platform}````bash



### Platform-Specific Build Requirementsnpm start              # Start web server (port 3000)## Usage



#### Windowsnpm run dev            # Development mode with auto-reload

- No additional requirements (cross-platform builds supported)

npm run electron       # Run as desktop application1. **Browse directories**: Click on folder names to navigate

#### macOS

- Xcode Command Line Tools (for building on macOS)npm run electron-dev   # Desktop dev mode with DevTools2. **Add to queue**: Click the + button next to files you want to download

- For cross-platform builds: Use Linux or macOS host

npm run clean          # Clean all build artifacts3. **Manage queue**: Use the Queue button in the header to view/manage your selections

#### Linux

- Standard build tools: `build-essential````4. **Export downloads**: Choose from wget script, curl script, or JSON export

- For Flatpak: `flatpak` and `flatpak-builder`

5. **Search files**: Use the search box to filter files in the current directory

```bash

# Ubuntu/Debian### Project Structure

sudo apt install flatpak flatpak-builder

### Desktop Application Features

# Fedora

sudo dnf install flatpak flatpak-builder```

```

myrient_viewer/- **Native menus**: File, Edit, View, Navigate, Window, and Help menus

### Installing Flatpak Builds

├── main.js              # Electron main process- **Keyboard shortcuts**: 

```bash

# Install locally built Flatpak├── preload.js           # Electron preload script  - `Ctrl+H` / `Cmd+H` - Go to home directory

flatpak install --user myrient-viewer-*.flatpak

├── server.js            # Express web server  - `F5` - Refresh current directory

# Run the application

flatpak run com.myrientviewer.app├── server-only.js       # Standalone server (for PKG builds)  - `Ctrl+K` / `Cmd+K` - Focus search box



# Uninstall├── package.json         # Project configuration  - `F12` - Toggle Developer Tools

flatpak uninstall com.myrientviewer.app

```├── public/              # Web UI files- **Window management**: Minimize, maximize, close with native controls



## 🔌 API Reference│   ├── index.html       # Main HTML- **Better integration**: Appears in taskbar/dock, respects system theme



The server exposes these REST endpoints:│   ├── app.js           # Frontend JavaScript



### Browse & Navigation│   └── styles.css       # Styling### Building Desktop Applications

- `GET /api/browse/:path*` - Browse Myrient directory at path

- Response: `{ files: [...], folders: [...], currentPath: "..." }`├── services/            # Backend services



### Queue Management│   ├── myrientService.js    # Myrient API wrapper#### Standard Desktop Builds

- `GET /api/queue` - Get current download queue

- `POST /api/queue/add` - Add file to queue│   └── queueService.js      # Queue management```bash

  - Body: `{ name, url, size }`

- `DELETE /api/queue/:id` - Remove file from queue├── scripts/./build-desktop.sh           # Standard installers

- `POST /api/queue/clear` - Clear entire queue

│   ├── build/           # Build scriptsnpm run build-desktop-all    # Windows, macOS, and Linux

### Export

- `GET /api/queue/export/json` - Export queue as JSON│   ├── setup/           # Setup scripts```

- `GET /api/queue/export/curl` - Export as curl download script

- `GET /api/queue/export/urls` - Export as plain URL list│   └── launch-desktop.sh    # Desktop launcher



## 🤝 Contributing├── flatpak/             # Flatpak configuration#### 📦 **Portable Applications (No Installation Required)**



Contributions are welcome! Here's how:└── assets/              # Icons and resources



1. Fork the repository```**Quick Build:**

2. Create a feature branch: `git checkout -b feature-name`

3. Make your changes and test thoroughly```bash

4. Commit: `git commit -am 'Add feature description'`

5. Push: `git push origin feature-name`### Making Changes./demo-electron.sh           # Quick Electron portable demo

6. Open a Pull Request

./build-portable.sh          # Interactive portable builder (all formats)

### Coding Guidelines

1. **Web UI**: Edit files in `public/` directory```

- Use consistent indentation (2 spaces)

- Add comments for complex logic2. **Backend**: Modify `server.js` and files in `services/`

- Test in both web and desktop modes

- Update documentation for new features3. **Desktop**: Update `main.js` or `preload.js`**Manual Build Commands:**



## 🐛 Troubleshooting4. **Test changes**: Run `npm run dev` or `npm run electron-dev````bash



### Common Issues# Electron Portable (Recommended - Working!)



**Desktop app won't start**## 🏗️ Buildingnpm run build-portable       # Windows .exe, Linux AppImage, macOS .zip

- Ensure Node.js v18+ is installed: `node --version`

- Try: `npm install` to reinstall dependencies

- Check: `npm run electron-dev` for error messages

### Portable Builds (Single-file Distribution)# PKG Binary (Experimental)  

**Web server port conflict**

- The app uses port 3000 by defaultnpm run build-pkg-all        # Single executables (may have dependency issues)

- Change in `server.js` or set `PORT` environment variable

Build portable applications that run without installation:

**Build failures**

- Run `npm run clean` to remove old build artifacts# Test built applications

- Ensure you have required build tools installed

- Check `package.json` scripts for specific requirements```bash./test-portable.sh           # Launch portable builds



**Flatpak build issues**./build-portable       # Interactive builder (Electron)```

- Ensure `flatpak` and `flatpak-builder` are installed

- Add Flathub runtime: `flatpak install flathub org.freedesktop.Platform//23.08`./build-flatpak        # Interactive builder (Flatpak)



### Getting Help```#### **🎯 Portable Options Explained**



- **Issues**: [GitHub Issues](https://github.com/WoofahRayetCode/myrient_viewer/issues)

- **Discussions**: Open a discussion on GitHub

- **Documentation**: Check this README and inline code commentsOr use npm scripts:| Type | Format | Size | Status | Pros | Cons |



## 📄 License|------|--------|------|--------|------|------|



MIT License - see [LICENSE](LICENSE) for details```bash| **Electron Portable** | `.exe`, `.AppImage`, `.zip` | ~100MB | ✅ **Working** | Full desktop features, no installation | Larger file size |



## 👤 Authornpm run build-portable     # Electron portable (all platforms)| **Flatpak** | `.flatpak` | ~100MB | ✅ **Working** | Linux universal, sandboxed, Flathub support | Linux only |



**Eric Parsley (WoofahRayetCode)**npm run build-flatpak      # Flatpak package| **PKG Binary** | Single executable | ~50MB | ⚠️ **Experimental** | Ultra-compact, instant startup | Dependency issues, web-only |



- GitHub: [@WoofahRayetCode](https://github.com/WoofahRayetCode)npm run build-pkg-all      # PKG standalone binaries (experimental)| **AppImage** | `.AppImage` | ~100MB | ✅ **Working** | Linux universal, no dependencies | Linux only |

- Project: [myrient_viewer](https://github.com/WoofahRayetCode/myrient_viewer)

```

## 🙏 Acknowledgments

#### **🐧 Flatpak Build (Linux)**

- [Myrient](https://myrient.erista.me/) - For providing the file archive

- [Electron](https://www.electronjs.org/) - Desktop application framework### Build Output FormatsBuild Flatpak package for distribution on Flathub or direct installation:

- [Express](https://expressjs.com/) - Web server framework

- [Cheerio](https://cheerio.js.org/) - HTML parsing```bash



## 📝 Changelog| Format | Platforms | Size | Status | Notes |./build-flatpak.sh           # Interactive Flatpak builder



### 2025.10.24|--------|-----------|------|--------|-------|npm run build-flatpak        # Build with electron-builder

- Project reorganization: Moved scripts to organized directories

- Added Flatpak build support with full configuration| **Electron Portable** | Windows `.exe`<br>Linux `.AppImage`<br>macOS `.zip` | ~100MB | ✅ Working | Full features, no installation required |```

- Simplified download exports (curl only)

- Added build cleaning scripts| **Flatpak** | Linux | ~100MB | ✅ Working | Universal Linux package, sandboxed |

- Enhanced .gitignore patterns

- Updated author information| **PKG Binary** | All platforms | ~50MB | ⚠️ Experimental | Ultra-compact, may have dependency issues |See [FLATPAK.md](FLATPAK.md) for detailed Flatpak build and distribution guide.



### Earlier Versions

- Initial release with web and desktop modes

- Queue management system### Build Output Locations**Installing Flatpak:**

- Export functionality (wget/curl/json)

- Search and filtering```bash

- Responsive UI design

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
