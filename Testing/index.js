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

module.exports = { analyzer }
