const crypto = require("node:crypto");

const start = Date.now(); //for measuring time taken

// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512");
// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512");
// crypto.pbkdf2Sync("password", "salt", 100000, 512, "sha512");

// console.log("Hash: ", Date.now() - start);

process.env.UV_THREADPOOL_SIZE = 5;

const MAX_CALLS = 6;

for (let i = 0; i < MAX_CALLS; i++) {
  crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
    console.log(`Hash: ${i + 1}`, Date.now() - start);
  });
}
