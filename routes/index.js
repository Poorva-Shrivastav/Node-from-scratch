const Router = require("express");
const router = Router();
const login = require("./login");
const users = require("./users");
const products = require("./products");
const cart = require("./cart");
const auth = require("./auth");

router.use("/api/login", login);
router.use("/api/auth", auth);
router.use("/api/products", products);
router.use("/api/users", users);
router.use("/api/cart", cart);

module.exports = router;
