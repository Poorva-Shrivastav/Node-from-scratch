const EventEmitter = require("node:events");

// event module returns a class called EventEmitter, which returns to events

const emitter = new EventEmitter();

emitter.on("order-pizza", (size, topping) => {
  console.log(`Order received. Baking ${size} pizz with ${topping}`);
});

console.log("Do work before event occurs");
emitter.emit("order-pizza", "large", "mushroom");
// to respond to the emit method, we register a listener, which is "on" method.

const BakeryShop = require("./bakery-shop");
const Drinks = require("./drinks");

const bakeryShop = new BakeryShop();
const drinks = new Drinks();

bakeryShop.on("cake-order", (size, type) => {
  console.log(`Making a ${size} ${type} cake`);
  drinks.serveDrink(size, type);
});
