const cluster = require("node:cluster");
const http = require("node:http");
const OS = require("node:os");

console.log(OS.cpus().length);
//master
if (cluster.isMaster) {
  console.log(`Master process ${cluster.pid} running`);
  cluster.fork(); //creates workers
  cluster.fork();
} else {
  console.log(`Worker process ${cluster.pid} started`);

  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home page");
    } else if (req.url === "/slowpage") {
      for (let i = 0; i < 600000000; i++) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Slow page");
      }
    }
  });

  server.listen(8000, () => {
    console.log("Server is listening");
  });
}
