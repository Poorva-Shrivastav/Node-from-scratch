const buffer = new Buffer.from("Poorva");

buffer.write("MJ"); //Manikchand - last letters are skipped

console.log(buffer.toString()); //returns the string
console.log(buffer); //raw binary data with Hexadecimal(base-16)
console.log(buffer.toJSON()); //returns array of charcodes for string
