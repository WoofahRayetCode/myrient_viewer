#!/usr/bin/env node

// Update package.json version to current date format: YYYY.MM.DD
const fs = require('fs');
const path = require('path');

function updateVersion() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Format: YYYY.MM.DD (semantic version compatible)
    const dateVersion = `${year}.${month}.${day}`;
    
    // Read package.json
    const packagePath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Update version
    const oldVersion = packageJson.version;
    packageJson.version = dateVersion;
    
    // Write back to package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`Updated version from ${oldVersion} to ${dateVersion}`);
    return dateVersion;
}

if (require.main === module) {
    updateVersion();
}

module.exports = { updateVersion };