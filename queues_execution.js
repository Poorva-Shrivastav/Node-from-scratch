const fs = require("node:fs");

setTimeout(() => console.log("SetTimeout 1"), 0);

// setImmediate(() => {
//   console.log("setimmediate");
// });

fs.readFile("./file.txt", () => {
  console.log("File read complete");
  setImmediate(() => {
    console.log("setimmediate");
  });
  process.nextTick(() => {
    console.log("Coming from FS - nextTick");
  });
  Promise.resolve().then(() => console.log("FS - Coming from promise"));
});

process.nextTick(() => {
  console.log("Coming from nextTick");
});

Promise.resolve().then(() => console.log("Coming from promise"));

// -----------------setImmediate---------------------
// If the check cb has any microtask code, the control moves from check queue to microtask queue as soon as the callback is triggered, and returns back to check queue after the execution is completed in microtask queue.

// setImmediate(() => console.log("SetImmediate 1"));
// setImmediate(() => {
//   console.log("SetImmediate 2");
//   process.nextTick(() => console.log("Nettick1"));
//   Promise.resolve().then(() => console.log("Promise  "));
// });

// setImmediate(() => console.log("SetImmediate 3"));

// --------------setTimeout with 0ms-----------------------------
// When running a setTimeout with 0ms delay and an I/O or setImmediate async method, the order of execution can never be guaranteed

// setTimeout(() => console.log("Settimeout"), 0);
// setImmediate(() => console.log(console.log("setImmediate")));
