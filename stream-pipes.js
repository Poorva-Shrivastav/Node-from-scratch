const fs = require("node:fs");
const zlib = require("node:zlib");

const gzip = zlib.createGzip();

const readStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 10,
});

const writeStream = fs.createWriteStream("./greet1.txt");

// readStream.on("data", (chunk) => {
//   console.log(chunk);
//   writeStream.write(chunk);
// });

// Pipes: createReadStream-reads from file; createWriteStream-write to a file. To make it simple.

readStream.pipe(writeStream);

//chaining with .pipe -> moving from readable stream to a transformed stream to a writeable stream
readStream.pipe(gzip).pipe(fs.createWriteStream("./greet1.txt.gz"));
