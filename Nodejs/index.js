const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("No argument accorde");
} else {
    console.log("hello", args);
}