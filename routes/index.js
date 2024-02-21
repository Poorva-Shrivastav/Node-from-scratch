const Router = require("express");
const router = Router();
const login = require("./login");
const users = require("./users");
const products = require("./products");

router.use("/api/login", login);
router.use("/api/products", products);
router.use("/api/users", users);

module.exports = router;
