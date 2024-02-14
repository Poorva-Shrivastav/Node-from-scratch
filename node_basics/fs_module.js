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
//   //!synchronous way of reading file
//   "./file.txt", //returns buffer with binary data
//   "utf-8" //make it human readable
// );

// console.log("readFileSync method: ", fileContent);

// console.log("Second");

// fs.readFile("./file.txt", "utf-8", (err, data) => {
//   //!error first callback pattern
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
