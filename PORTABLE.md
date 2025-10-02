# Myrient Viewer - Portable Deployment Guide

## Overview

Myrient Viewer can be deployed in multiple portable formats, allowing users to run it without installation on any system. This guide covers all portable deployment options.

## 📦 Portable Build Types

### 1. **Electron Portable** (Recommended)
- **Format**: `.exe` (Windows), `.AppImage` (Linux), `.zip` (macOS)
- **Size**: ~150MB
- **Features**: Full desktop application with native menus, window management
- **Best for**: End users who want the complete desktop experience

### 2. **PKG Binary** 
- **Format**: Single executable file
- **Size**: ~50MB
- **Features**: Lightweight, command-line based, ultra-fast startup
- **Best for**: Server deployments, automation, minimal footprint

### 3. **AppImage** (Linux)
- **Format**: `.AppImage` 
- **Size**: ~150MB
- **Features**: Universal Linux binary, runs on any distribution
- **Best for**: Linux users, no package manager required

## 🚀 Quick Start

### Build All Portable Formats
```bash
./build-portable.sh
```

### Test Portable Builds
```bash
./test-portable.sh
```

### Manual Build Commands
```bash
# Electron portable versions
npm run build-portable

# PKG single executables  
npm run build-pkg-all

# Current platform only (faster)
npm run build-pkg
```

## 📁 File Structure After Build

```
myrient_viewer/
├── dist/                          # Electron builds
│   ├── Myrient Viewer-1.0.0.AppImage      # Linux AppImage
│   ├── Myrient Viewer-1.0.0-portable.exe # Windows portable
│   └── Myrient Viewer-1.0.0-mac.zip      # macOS portable
└── dist-pkg/                      # PKG binaries
    ├── myrient-viewer-linux       # Linux binary
    ├── myrient-viewer-macos       # macOS binary  
    └── myrient-viewer-win.exe     # Windows binary
```

## 🎯 Distribution Scenarios

### Scenario 1: End User Desktop Application

**Recommended**: Electron Portable
```bash
# Build
npm run build-portable

# Distribute
# - Windows: Share the .exe file
# - Linux: Share the .AppImage file  
# - macOS: Share the .zip file
```

**User Experience**:
- Double-click to run
- No installation required
- Full desktop interface with menus
- Works offline after first run

### Scenario 2: System Administrator / Automation

**Recommended**: PKG Binary
```bash
# Build
npm run build-pkg-all

# Deploy
cp dist-pkg/myrient-viewer-linux /usr/local/bin/myrient-viewer
chmod +x /usr/local/bin/myrient-viewer
```

**Use Cases**:
- Server environments
- Automated scripts
- CI/CD pipelines
- Minimal resource usage

### Scenario 3: Universal Linux Distribution

**Recommended**: AppImage
```bash
# Build (included in portable build)
npm run build-portable

# Distribute
chmod +x "dist/Myrient Viewer-1.0.0.AppImage"
```

**Benefits**:
- Runs on any Linux distribution
- No dependencies required
- Sandboxed execution
- Self-updating capable

## 🔧 Customization

### Custom Build Configuration

Edit `package.json` to customize builds:

```json
{
  "build": {
    "portable": {
      "artifactName": "MyCustomName-${version}.${ext}"
    },
    "appImage": {
      "artifactName": "MyApp-${version}.${ext}"
    }
  }
}
```

### PKG Binary Options

Edit the `pkg` section in `package.json`:

```json
{
  "pkg": {
    "targets": [
      "node18-win-x64",
      "node18-linux-x64", 
      "node18-macos-x64"
    ],
    "assets": [
      "public/**/*",
      "custom-assets/**/*"
    ]
  }
}
```

## 📊 Comparison Table

| Feature | Electron Portable | PKG Binary | AppImage |
|---------|------------------|------------|----------|
| **File Size** | ~150MB | ~50MB | ~150MB |
| **Startup Time** | 2-3s | <1s | 2-3s |
| **UI** | Full desktop | Web interface | Full desktop |
| **Menus** | Native | None | Native |
| **Dependencies** | None | None | None |
| **Platforms** | Win/Mac/Linux | Win/Mac/Linux | Linux only |
| **Auto-update** | Possible | Manual | Built-in |
| **Sandboxing** | Partial | None | Full |

## 🛠️ Advanced Usage

### Environment Variables

Control portable behavior with environment variables:

```bash
# PKG Binary mode
export PKG_MODE=1

# Custom port
export PORT=8080

# Asset path override
export ASSET_PATH=/custom/path
```

### Command Line Usage

**PKG Binary**:
```bash
# Default usage
./myrient-viewer-linux

# Custom port
PORT=8080 ./myrient-viewer-linux

# Background mode
nohup ./myrient-viewer-linux &
```

**Electron Portable**:
```bash
# Windows
./Myrient-Viewer-1.0.0-portable.exe

# Linux AppImage
chmod +x ./Myrient-Viewer-1.0.0.AppImage
./Myrient-Viewer-1.0.0.AppImage

# macOS (extract zip first)
./Myrient\ Viewer.app/Contents/MacOS/Myrient\ Viewer
```

## 🔒 Security Considerations

### Portable Application Security

1. **Code Signing** (Recommended for distribution):
   ```bash
   # Windows
   signtool sign /f certificate.p12 /p password app.exe
   
   # macOS
   codesign --sign "Developer ID Application" app.app
   ```

2. **Checksums** for integrity verification:
   ```bash
   sha256sum myrient-viewer-* > checksums.txt
   ```

3. **Sandboxing**: AppImage provides the best sandboxing

### Network Security
- All builds include the same security measures as the web version
- HTTPS enforcement for external requests
- No external network access required after first run

## 📈 Performance Optimization

### Reducing Bundle Size

1. **Electron**:
   ```json
   {
     "build": {
       "compression": "maximum",
       "nsis": {
         "compression": "ultra"
       }
     }
   }
   ```

2. **PKG**:
   ```json
   {
     "pkg": {
       "compress": "Brotli"
     }
   }
   ```

### Faster Startup

1. **Precompile assets**:
   ```bash
   npm run precompile-assets  # Custom script
   ```

2. **Optimize Node.js version**:
   ```json
   {
     "pkg": {
       "targets": ["node18-linux-x64"]  # Latest LTS
     }
   }
   ```

## 🚀 Distribution Best Practices

### 1. Release Process
```bash
# 1. Version bump
npm version patch

# 2. Build all formats
./build-portable.sh

# 3. Generate checksums
cd dist && sha256sum * > ../checksums.txt
cd ../dist-pkg && sha256sum * >> ../checksums.txt

# 4. Create release package
tar -czf myrient-viewer-portable-$(npm run version --silent).tar.gz dist/ dist-pkg/ checksums.txt
```

### 2. GitHub Releases Integration
```bash
# Upload to GitHub releases
gh release create v$(npm run version --silent) \
  dist/* \
  dist-pkg/* \
  checksums.txt \
  --title "Myrient Viewer v$(npm run version --silent)" \
  --notes "Portable release with Electron and PKG binaries"
```

### 3. Update Documentation
Always include:
- System requirements
- Installation instructions  
- Troubleshooting guide
- Security considerations

## 🆘 Troubleshooting

### Common Issues

#### "Permission Denied" on Linux
```bash
chmod +x myrient-viewer-linux
chmod +x *.AppImage
```

#### Windows SmartScreen Warning
- Right-click → Properties → Unblock
- Or code-sign the executable

#### macOS Gatekeeper Block
```bash
# First run only
sudo xattr -r -d com.apple.quarantine "Myrient Viewer.app"
```

#### Port Already in Use
```bash
# Use different port
PORT=3001 ./myrient-viewer-linux
```

### Debug Mode
```bash
# PKG binary with debug
DEBUG=1 ./myrient-viewer-linux

# Electron with DevTools
./app --enable-dev-tools
```

## 📞 Support

For portable deployment issues:
1. Check system requirements
2. Verify file permissions
3. Test with debug mode
4. Report issues with system info and error logs