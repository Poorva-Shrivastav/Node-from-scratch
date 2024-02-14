const express = require("express");
const router = express.Router();

// /products
router.get("/", (req, res) => {
  res.send("Get req for products");
});

// /products/get-product-details
router.get("/get-product-details", (req, res) => {
  res.send("get-product-details req for products");
});

module.exports = router;
