const fs = require("node:fs");

const readableStream = fs.createReadStream("./file.txt");
readableStream.close();

readableStream.on("close", () => console.log("Readable stream closed"));

setTimeout(() => console.log("Settimeout"), 0);
setImmediate(() => console.log("SetImmediate"));
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("Nexttick"));
