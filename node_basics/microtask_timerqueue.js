console.log("1");

setTimeout(() => {
  console.log("Settimeout 1");
  Promise.resolve().then(() =>
    console.log("Promise Coming from 1st setTimeout")
  );
}, 0);
setTimeout(() => {
  console.log("Settimeout 2");
  process.nextTick(() => console.log("NextTick Coming from inner setTimeout"));
}, 0);
setTimeout(() => {
  console.log("Settimeout 3");
}, 0);
process.nextTick(() => console.log("Coming from NextTick 1"));
process.nextTick(() => {
  console.log("Coming from NextTick 2");
  process.nextTick(() => console.log("Coming from INNER"));
});
process.nextTick(() => console.log("Coming from NextTick 3"));

Promise.resolve().then(() => console.log("Promise resolved 1"));
Promise.resolve().then(() => {
  console.log("Promise resolved 2");
  process.nextTick(() => console.log("NextTick coming from PROMISE"));
});
Promise.resolve().then(() => console.log("Promise resolved 3"));

console.log("2");
