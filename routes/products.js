const express = require("express");
const router = express.Router();

// /products
router.get("/", (req, res) => {
  res.send([
    { id: 1, name: "Milk", brand: "Amul" },
    { id: 2, name: "Curd", brand: "Milky Mist" },
  ]);
});

// /products/get-product-details
router.get("/get-product-details", (req, res) => {
  res.send("get-product-details req for products");
});

module.exports = router;
