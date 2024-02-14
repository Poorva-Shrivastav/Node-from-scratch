const express = require("express");
const app = express();
const products = require("./routes/products");
const users = require("./routes/user");
const login = require("./routes/login");

const PORT = process.env.PORT || 8000;

let name = "kj";
let password = 123456;

app.use("/login", login);
// app.use(loginMiddleware);
app.use("/products", products);
app.use("/users", users);

function loginMiddleware(req, res, next) {
  if (name === "PJ" && password === 123456) {
    next();
  } else res.send("User can't be authenticated");
}

app.listen(PORT, () => console.log(`server is listing to ${PORT}`));
