#!/usr/bin/env node
const { Command } = require("commander");
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');

const program = new Command();

program
    .name('vraj')
    .description('A CLI to count words, lines, and characters in a file')
    .version('1.0.0')
    .argument('<filepath>', 'path to the file to be processed')
    .option('-o, --output <description>', 'pipe the results to a specific file')
    .option('--json', "output in json format")
    .option('-l, --lines', "That give the lines in words")
    .option('-w, --words', "That give the total words")
    .option('-c, --chars', "That give the count of character in file")
    .action((filepath, options) => {
        const absolutePath = path.resolve(process.cwd(), filepath);
        analyzeWithPipe(absolutePath, options);
    });

const analyzeWithPipe = (absolutePath, options) => {
    const readStream = fs.createReadStream(absolutePath, { encoding: 'utf-8' });
    let lines = 0;
    let characters = 0;
    let words = 0
    let leftOver = "";
    let message = "";

    const analyzer = new Transform({
        transform(chunk, encoding, callback) {
            message += chunk;
            characters += chunk.length;

            const data = leftOver + chunk;
            const parts = data.split('\n');

            lines += parts.length - 1;
            leftOver = parts.pop();

            const completeText = parts.join("\n");
            const wordArr = completeText.trim().split(/\s+/).filter(Boolean);
            words += wordArr.length;
            callback();
        },
        flush(callback) {
            if (leftOver) {
                lines += 1;
                words += leftOver.trim().split(/\s+/).filter(Boolean).length;
            }

            const result = { lines, words, characters, message };
            let output;

            if (options.json) {
                output = JSON.stringify(result, null, 2);
            } else if (options.lines) {
                output = `Lines: ${lines}`;
            } else if (options.words) {
                output = `Words: ${words}`;
            } else if (options.chars) {
                output = `Characters: ${characters}`;
            } else {
                output = `
📄 File Analysis
----------------
Lines      : ${lines}
Words      : ${words}
Characters : ${characters}
Message    : ${message}
`;
            }

            this.push(output);
            callback();
        }
    });

    readStream.on('error', () => {
        console.error("❌ File not found or cannot be read");
        process.exit(1);
    })

    if (options.output) {
        const outputPath = path.resolve(process.cwd(), options.output);
        const writeStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });

        readStream
            .pipe(analyzer)
            .pipe(writeStream)

        writeStream.on("finish", () => {
            console.log(`✅ Output written to ${outputPath}`);
            process.exit(0);
        });

        writeStream.on("error", (err) => {
            console.error("❌ Write error:", err.message);
            process.exit(1);
        })
    } else {
        readStream
            .pipe(analyzer)
            .pipe(process.stdout)
            .on('finish', () => {
                process.exit(0);
            })
    }
}


program.parse(process.argv);