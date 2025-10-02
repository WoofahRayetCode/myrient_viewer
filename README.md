# Myrient Viewer

A Node.js application for browsing the [Myrient](https://myrient.erista.me/files/) file structure and managing download queues.

## Features

- 🗂️ **Browse Myrient directory structure** - Navigate through folders just like a file manager
- 📋 **Queue files for downloading** - Add files to a download queue for batch processing
- 📥 **Export download scripts** - Generate wget/curl scripts or JSON lists
- 🔍 **Search and filter files** - Find files quickly within directories
- 📱 **Responsive web interface** - Works great on desktop and mobile
- ⚡ **Fast directory parsing** - Efficient HTML parsing of Myrient's directory listings
- 🎮 **ROM-aware file types** - Recognizes game files, archives, and other retro formats
- 📦 **Portable deployment** - Run from single executable file, no installation needed
- 🖥️ **Multiple run modes** - Web browser, desktop app, or standalone binary

## Screenshots

The app provides a clean, modern interface for browsing Myrient's extensive collection of retro game files, allowing you to queue up downloads and export them as scripts for later use.

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - Download from [nodejs.org](https://nodejs.org/)
- npm (usually comes with Node.js)

### Installation Options

#### Option 1: Desktop Application (Recommended)

Run as a standalone desktop application with native menus and better integration:

1. **Clone or download this repository**

2. **Launch the desktop app**:
   ```bash
   ./launch-desktop.sh
   ```
   
   **Or manually**:
   ```bash
   npm install
   npm run electron
   ```

3. **The desktop app will open automatically** - no browser needed!

#### Option 2: Web Application

Run in your browser for a lightweight experience:

1. **Run the setup script**:
   ```bash
   ./setup.sh
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open your browser** to `http://localhost:3000`

### Development

- **Web development**: `npm run dev` (auto-reload web server)
- **Desktop development**: `npm run electron-dev` (dev mode with DevTools)
- **Build desktop apps**: `npm run build-desktop` (current platform)
- **Build for all platforms**: `npm run build-desktop-all` (Windows, macOS, Linux)

## Usage

1. **Browse directories**: Click on folder names to navigate
2. **Add to queue**: Click the + button next to files you want to download
3. **Manage queue**: Use the Queue button in the header to view/manage your selections
4. **Export downloads**: Choose from wget script, curl script, or JSON export
5. **Search files**: Use the search box to filter files in the current directory

### Desktop Application Features

- **Native menus**: File, Edit, View, Navigate, Window, and Help menus
- **Keyboard shortcuts**: 
  - `Ctrl+H` / `Cmd+H` - Go to home directory
  - `F5` - Refresh current directory
  - `Ctrl+K` / `Cmd+K` - Focus search box
  - `F12` - Toggle Developer Tools
- **Window management**: Minimize, maximize, close with native controls
- **Better integration**: Appears in taskbar/dock, respects system theme

### Building Desktop Applications

#### Standard Desktop Builds
```bash
./build-desktop.sh           # Standard installers
npm run build-desktop-all    # Windows, macOS, and Linux
```

#### 📦 **Portable Applications (No Installation Required)**

**Quick Build:**
```bash
./demo-electron.sh           # Quick Electron portable demo
./build-portable.sh          # Interactive portable builder (all formats)
```

**Manual Build Commands:**
```bash
# Electron Portable (Recommended - Working!)
npm run build-portable       # Windows .exe, Linux AppImage, macOS .zip

# PKG Binary (Experimental)  
npm run build-pkg-all        # Single executables (may have dependency issues)

# Test built applications
./test-portable.sh           # Launch portable builds
```

#### **🎯 Portable Options Explained**

| Type | Format | Size | Status | Pros | Cons |
|------|--------|------|--------|------|------|
| **Electron Portable** | `.exe`, `.AppImage`, `.zip` | ~100MB | ✅ **Working** | Full desktop features, no installation | Larger file size |
| **PKG Binary** | Single executable | ~50MB | ⚠️ **Experimental** | Ultra-compact, instant startup | Dependency issues, web-only |
| **AppImage** | `.AppImage` | ~100MB | ✅ **Working** | Linux universal, no dependencies | Linux only |

#### **📁 Output Locations**
- **Standard builds**: `dist/` directory
- **Portable builds**: `dist/` and `dist-pkg/` directories
- **All builds**: Can be distributed as single files

## API Endpoints

- `GET /api/browse/:path*` - Browse Myrient directory
- `POST /api/queue/add` - Add file to download queue
- `DELETE /api/queue/:id` - Remove file from queue
- `GET /api/queue` - Get current queue
- `GET /api/queue/export/:format` - Export queue (json, wget, curl)

## License

MIT