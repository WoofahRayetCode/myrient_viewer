#!/usr/bin/env node

// Rename PKG outputs to include version number
const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

function renamePkgOutputs() {
    const version = packageJson.version;
    const distPkgDir = path.join(__dirname, 'dist-pkg');
    
    if (!fs.existsSync(distPkgDir)) {
        console.log('dist-pkg directory not found');
        return;
    }
    
    const files = fs.readdirSync(distPkgDir);
    
    files.forEach(file => {
        if (file.startsWith('server-only')) {
            const ext = path.extname(file);
            
            let platform = '';
            if (file.includes('win') || ext === '.exe') {
                platform = 'win';
            } else if (file.includes('linux')) {
                platform = 'linux';
            } else if (file.includes('macos')) {
                platform = 'macos';
            }
            
            if (platform) {
                const newName = `myrient-viewer-${version}-${platform}${ext}`;
                const oldPath = path.join(distPkgDir, file);
                const newPath = path.join(distPkgDir, newName);
                
                fs.renameSync(oldPath, newPath);
                console.log(`Renamed ${file} to ${newName}`);
            }
        }
    });
}

if (require.main === module) {
    renamePkgOutputs();
}

module.exports = { renamePkgOutputs };