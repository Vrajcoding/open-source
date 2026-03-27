const fs = require('fs');
const path = require('path');
const { spawn } = require("child_process");

const analyzer = (filepath) => {
    if (!fs.existsSync(filepath)) {
        throw new Error("File not found");
    }

    const data = fs.readFileSync(filepath, {
        encoding: 'utf-8'
    });

    return data;
}

const child = spawn("git", ["log", "--oneline", "-10"]);
let buffer = "";
child.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    let lines = buffer.split("\n");

    buffer = lines.pop();
    for (let line of lines) {
        //if(!line.trim()) continue;
        const [hash, ...message] = line.split(" ");
        console.log({ hash, message: message.join(" ") })
    }
    //console.log(lines);
})

child.on("close", (code) => {
    console.log("Child process exited with code :", code);
})


module.exports = { analyzer }
