console.log("hello world")

setTimeout(() => {
    console.log("this is my 5 code")
}, 5000)

setTimeout(() => {
    setTimeout(() => {
        console.log("this is my 2 code")
    }, 2000)
}, 2000)


setTimeout(() => {
    console.log("this is my 4 code")
}, 4000)


setTimeout(() => {
    console.log("this is my second code")
}, 2000)

console.log("backend");