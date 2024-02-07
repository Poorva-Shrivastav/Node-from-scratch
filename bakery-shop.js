const EventEmitter = require("node:events");

class Bakery extends EventEmitter {
  //now we can use Bakery class as an EventEmitter class, we can now emit an event
  //and we don't need a seperate emitter obj. this keyword refers to the emitter obj
  constructor() {
    super();
    this.orderNo = 0;
  }

  currentOrder(size, type) {
    this.orderNo++;
    this.emit("cake-order", size, type);
  }

  displayOrderNo() {
    console.log(`Current Order No: ${this.orderNo}`);
  }
}

module.exports = Bakery;
