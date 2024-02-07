// const superHero = require("./superhero");
// const calc = require("./calc");
// const { average, percent } = calc;
// const data = require("./data.json");

// const newSuperHero = new superHero("SuperMan");

// console.log(newSuperHero.getName());

// console.log(percent(20, 40));

// console.log(data);

// const EventEmitter = require("node:events");

//event module returns a class called EventEmitter, which returns to events

// const emitter = new EventEmitter();

// emitter.on("order-pizza", (size, topping) => {
//   console.log(`Order received. Baking ${size} pizz with ${topping}`);
// });

// console.log("Do work before event occurs");
// emitter.emit("order-pizza", "large", "mushroom");
//to respond to the emit method, we register a listener, which is "on" method.

// const BakeryShop = require("./bakery-shop");
// const Drinks = require("./drinks");

// const bakeryShop = new BakeryShop();
// const drinks = new Drinks();

// bakeryShop.on("cake-order", (size, type) => {
//   console.log(`Making a ${size} ${type} cake`);
//   drinks.serveDrink(size, type);
// });

// bakeryShop.currentOrder("1kg", "Death by cholocate");
// bakeryShop.displayOrderNo();

const fs = require("node:fs/promises");

// -------------async await based---------------
async function readFile() {
  try {
    const data = await fs.readFile("greet.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
readFile();

// -------------then catch based----------------

// console.log("before promise");

// fs.readFile("file.txt", "utf-8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// console.log("after promise");

// const fs = require("node:fs");

// console.log("First");

// const fileContent = fs.readFileSync(
//   //synchronous way of reading file
//   "./file.txt", //returns buffer with binary data
//   "utf-8" //make it human readable
// );

// console.log("readFileSync method: ", fileContent);

// console.log("Second");

// fs.readFile("./file.txt", "utf-8", (err, data) => {
//   //error first callback pattern
//   if (err) {
//     console.log(err);
//   } else console.log(data);
// });

// console.log("Third");

// fs.writeFileSync("./greet.txt", "Hello Chinki");
// fs.writeFile(
//   "./greet.txt",
//   " Hello Minki",
//   { flag: "a" }, //for appending the content
//   (err) => {
//     if (err) console.log(err);
//     else console.log("Created a new file");
//   }
// );
