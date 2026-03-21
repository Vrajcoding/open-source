const chokidar = require('chokidar');
const path = require('path');

const dirPath = process.cwd();
console.log(dirPath)
const watcher = chokidar.watch(dirPath, {
    persistent: true,
    ignoreInitial: true
})

watcher
    .on('add', (filepath) => logEvent(filepath, 'added'))
    .on('change', (filepath) => logEvent(filepath, 'changed'))
    .on('unlink', (filepath) => logEvent(filepath, 'deleted'));


function logEvent(filepath, event) {
    const filename = path.basename(filepath);
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp} : ${filename} was ${event}`);
}