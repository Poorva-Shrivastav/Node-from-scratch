const https = require("node:https");

const start_date = Date.now();
const MAX_CALLS = 1;

for (let i = 0; i < MAX_CALLS; i++) {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Request: ${i}`, Date.now() - start_date);
      });
    })
    .end();
}
