const path = require("node: path");

// console.log(__filename);
// console.log(__dirname);

// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));

// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));

// console.log(path.parse(__filename));
// console.log(path.format(path.parse(__filename)));

// console.log(path.isAbsolute(__filename));

// ---------------path.join--------------------
// console.log(path.join("/folder1", "folder2", "index.html"));

// console.log(__dirname, "data.json");

// ---------------path.resolve--------------------
console.log(path.resolve("folder1", "folder2", "index.html"));
console.log(path.resolve("/folder1", "folder2", "index.html"));

// console.log(__dirname, "data.json");
