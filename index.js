// const superHero = require("./superhero");
// const calc = require("./calc");
// const { average, percent } = calc;
// const data = require("./data.json");

// const newSuperHero = new superHero("SuperMan");

// console.log(newSuperHero.getName());

// console.log(percent(20, 40));

// console.log(data);

// bakeryShop.currentOrder("1kg", "Death by cholocate");
// bakeryShop.displayOrderNo();

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
