const { Command } = require("commander");
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');

const program = new Command();

program
    .name('file-analyzer')
    .description('A CLI to count words, lines, and characters in a file')
    .version('1.0.0')
    .argument('<filepath>', 'path to the file to be processed')
    .option('-o, --output <description>', 'pipe the results to a specific file')
    .option('--json', "output in json format")
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

    const analyzer = new Transform({
        transform(chunk, encoding, callback) {
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

            const result = { lines, words, characters };
            let output;

            if (options.json) {
                output = JSON.stringify(result, null, 2)
            } else {
                output = `Lines: ${lines}\nWords: ${words}\nCharacters: ${characters}`;
            }

            this.push(output);
            callback();
        }
    });

    if (options.output) {
        const outputPath = path.resolve(process.cwd(), options.output);
        const writeStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });

        readStream
            .pipe(analyzer)
            .pipe(writeStream)

        writeStream.on("finish", () => {
            console.log(`✅ Output written to ${outputPath}`);
        });


        writeStream.on("error", (err) => {
            console.error("❌ Write error:", err.message);
        })
    } else {
        readStream
            .pipe(analyzer)
            .pipe(process.stdout);
    }
}


program.parse(process.argv);