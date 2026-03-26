const fs = require('fs');
const path = require('path');


const analyzer = (filepath) => {
    if (!fs.existsSync(filepath)) {
        throw new Error("File not found");
    }

    const data = fs.readFileSync(filepath, {
        encoding: 'utf-8'
    });

    return data;
}
function test() {
    throw new Error("fake function called");
}

setTimeout(() => {
    test();
}, 2000)

process.on('uncaughtException', (err) => {
    console.log("uncaughtException ", err.message);
    process.exit(1);
})

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err.message);
    process.exit(1);
})

module.exports = { analyzer }
