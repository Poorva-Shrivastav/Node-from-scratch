setImmediate(() => console.log("SetImmediate 1"));
setImmediate(() => {
  console.log("SetImmediate 2");
  process.nextTick(() => console.log("Nettick1"));
  Promise.resolve().then(() => console.log("Promise  "));
});

setImmediate(() => console.log("SetImmediate 3"));
