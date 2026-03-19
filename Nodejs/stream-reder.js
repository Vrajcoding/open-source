const fs = require('fs');
const path = require('path')

const filepath = path.join(__dirname, "large-file.txt");

const rr = fs.createReadStream(filepath);
let chunkcount = 0;
let totalBytes = 0;
rr.on("data", (chunk) => {
    chunkcount++;
    const chunkBytes = Buffer.byteLength(chunk);

    totalBytes += chunkBytes;
    console.log(`chunk ${chunkcount} : ${chunkBytes} bytes`);
})

rr.on('end', () => {
    console.log(`total bytes read : ${totalBytes}`);
    console.log(`total chunk read : ${chunkcount}`);
})

