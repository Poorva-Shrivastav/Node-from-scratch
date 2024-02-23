const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: items } = req;
  const { cart } = req.session;
  if (cart) cart.push(items);
  else {
    req.session.cart = [items];
  }
  return res.status(201).send(items);
});

router.get("/", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  else return res.send(req.session.cart) ?? [];
});

module.exports = router;
