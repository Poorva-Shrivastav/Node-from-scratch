// const superHero = require("./superhero");
// const calc = require("./calc");
// const { average, percent } = calc;
// const data = require("./data.json");

// const newSuperHero = new superHero("SuperMan");

// console.log(newSuperHero.getName());

// console.log(percent(20, 40));

// console.log(data);

const EventEmitter = require("node:events");

//event module returns a class called EventEmitter, which returns to events

const emitter = new EventEmitter();

emitter.on("order-pizza", (size, topping) => {
  console.log(`Order received. Baking ${size} pizz with ${topping}`);
});

console.log("Do work before event occurs");
emitter.emit("order-pizza", "large", "mushroom");
//to respond to the emit method, we register a listener, which is "on" method.
