const fs = require('fs');
const path = require('path');

const dir_path = path.resolve(process.cwd(), "cli_logging");

fs.watch(dir_path, (event, filename) => {
    if (filename) {
        const timeStemp = new Date().toLocaleString();

        let changeType = "";

        if (event === "rename") {
            const fullPath = path.join(dir_path, filename);
            if (fs.existsSync(fullPath)) {
                changeType = "added";
            } else {
                changeType = "deleted";
            }

        } else if (event === "change") {
            changeType = "modifed"
        }
        console.log(`${timeStemp} : ${filename} was ${changeType}`);
    }
})




