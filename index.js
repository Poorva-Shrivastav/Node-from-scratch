const express = require("express");
const app = express();
const products = require("./routes/products");
const users = require("./routes/user");
const login = require("./routes/login");
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api/login", login);
app.use(loginMiddleware);
app.use("/api/products", products);
app.use("/api/users", users);

function loginMiddleware(req, res, next) {
  console.log(`req method : "${req.method}"  req url: "${req.url}"`);
  next();
}

app.listen(PORT, () => console.log(`server is listing to ${PORT}`));
