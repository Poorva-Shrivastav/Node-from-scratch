const express = require("express");
const router = express.Router();
const users = require("../utils/constants");
const passport = require("passport");
const strategy = require("../strategy/local-strategy");

passport.use(strategy);
router.post("/", (req, res) => {
  const {
    body: { username, password },
  } = req;

  const findUser = users.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return res.sendStatus(401, { msg: "Bad credentials" });
  }
  req.session.user = findUser; //the session id belongs to this user
  return res.sendStatus(200, { user: findUser });
});

router.get("/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) throw err;
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not authenticated" });
});

router.post("/validate", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.get("/validate/status", (req, res) => {
  console.log("/validate/status");
  console.log(req.user);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    return res.sendStatus(200);
  });
});
module.exports = router;
