const { Command } = require("commander");
const path = require('path');
const fs = require('fs');

const program = new Command();

program
    .name('file-analyzer')
    .description('A CLI to count words, lines, and characters in a file')
    .version('1.0.0')
    .argument('<filepath>', 'path to the file to be processed')
    .option('--json', "output in json format")
    .action(async (filepath, options) => {
        const absolutePath = path.resolve(process.cwd(), filepath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`❌ Error: File not found at ${absolutePath}`);
            process.exit(1);
        }

        const readStream = fs.createReadStream(absolutePath, { encoding: 'utf8' });

        // State trackers
        let lines = 0;
        let words = 0;
        let chars = 0;
        let inWord = false; // Tracks word boundaries across chunks

        try {
            for await (const chunk of readStream) {
                chars += chunk.length;

                for (let i = 0; i < chunk.length; i++) {
                    const char = chunk[i];

                    if (char === '\n') {
                        lines++;
                    }

                    // Regex to check for any whitespace (space, tab, newline, carriage return)
                    const isWhitespace = /\s/.test(char);

                    if (!isWhitespace && !inWord) {
                        // We hit a non-whitespace character and weren't already in a word
                        words++;
                        inWord = true;
                    } else if (isWhitespace) {
                        // We hit whitespace, meaning the current word ended
                        inWord = false;
                    }
                }
            }

            if (chars > 0 && lines === 0) lines = 1;
            const results = {
                [path.basename(absolutePath)]: {
                    Lines: lines,
                    Words: words,
                    Characters: chars
                }
            };

            console.log('\n✅ Analysis Complete:\n');
            const State = {
                lines,
                words,
                chars
            }
            if (options.json) {
                console.log(JSON.stringify(State))
            } else {
                console.table(results);
            }

        } catch (error) {
            console.error(`\n❌ Stream error: ${error.message}`);
            process.exit(1);
        }
    });

program.parse(process.argv);