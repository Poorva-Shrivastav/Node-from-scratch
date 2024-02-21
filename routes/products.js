const express = require("express");
const router = express.Router();

// /products
router.get("/", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies);
  // if (req.cookies.hello && req.cookies.hello === "world!") {
  if (req.signedCookies.hello && req.signedCookies.hello === "world!") {
    return res.send([
      { id: 1, name: "Milk", brand: "Amul" },
      { id: 2, name: "Curd", brand: "Milky Mist" },
    ]);
  }
  return res.status(403).send({ message: "You need a correct cookie" });
});

// /products/get-product-details
router.get("/get-product-details", (req, res) => {
  res.send("get-product-details req for products");
});

module.exports = router;
