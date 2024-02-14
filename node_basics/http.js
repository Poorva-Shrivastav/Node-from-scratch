const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  //   const person = {
  //     name: "Alice",
  //     age: 24,
  //     address: "Wonderland",
  //   };

  const name = "Chinki Minki";
  res.writeHead(200, { "Content-Type": "text/html" });

  //readFileSync - loads all the data at one time and occupies the memory.
  let html = fs.readFileSync("./index.html", "utf-8");
  html = html.replace("{{name}}", name);
  res.end(html);

  //   const html = fs.createReadStream(__dirname + "/index.html").pipe(res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server running on port 3000");
});

//http module extends the eventemitter class and cb here is a request listener.
