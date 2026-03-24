const { analyzer } = require("./index.js");


test("file not found", () => {
    expect(() => analyzer("file.txt"))
        .toThrow("File not found")
})