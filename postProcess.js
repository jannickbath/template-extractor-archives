const fs = require('fs');
const path = require('path');

function postProcessFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace the require pattern with the desired one
    content = content.replace(/require\("\.\.\/helper"\)/g, 'require("./helper.js")');

    fs.writeFileSync(filePath, content);
}

const targetDirectory = process.argv[2];

if (!targetDirectory) {
    console.error('No target directory provided.');
    process.exit(1);
}

const buildFilePath = path.join(targetDirectory, 'build.js');
postProcessFile(buildFilePath);
