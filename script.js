console.log("this is another commit")

setImmediate(() => {
    console.log("immediate function")
})

process.nextTick(() => {
    console.log("nextTick function")
})

setTimeout(() => {
    console.log("setTimeout function")
}, 0)


Promise.resolve().then(() => {
    console.log("this is promise function");
})

console.log("hello")