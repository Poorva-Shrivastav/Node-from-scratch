const { parentPort } = require("node:worker_threads");

let j = 0;
for (let i = 0; i < 60000; i++) {
  j++;
}

parentPort.postMessage(j);

const http = require("node:http");
const { Worker } = require("node:worker_threads");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
  } else if (req.url === "/slowpage") {
    const worker = new Worker("./worker-thread.js");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Slow page ${j}`);
  }
});

server.listen(3000, () => {
  console.log("Server is listening");
});
