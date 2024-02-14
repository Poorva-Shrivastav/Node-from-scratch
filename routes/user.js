const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// /users/all-users
const users = [];
router.get("/all-users", (req, res) => {
  res.send("Seding all users data" + users);
});

router.post("/add-user", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.send("User created");
  } catch (err) {
    res.status(500).send("User can't be created");
  }
});

// /users/user-details

router.get("/user-details/:id", (req, res) => {
  res.send("User details for " + req.params.id);
});

router.get("/search-by-location/:state/:city", (req, res) => {
  res.send("User details for " + req.params.state + req.params.city);
});

router.get("/search/:key([0-9]{4})", (req, res) => {
  res.send(
    "/search/:key([0-9]{4}) -> key can be only numbers with 4 digits validation " +
      req.params.key
  );
});

router.get("/search-username/:key([a-zA-Z]{5})", (req, res) => {
  res.send(
    "/search/:key([0-9]{4}) -> key can be only alphabets with 5 digits validation " +
      req.params.key
  );
});

router.get("*", (req, res) => {
  let resObj = {
    statusCode: 404,
    statusMessage: "URL not found",
  };
  res.send(resObj);
});

module.exports = router;
