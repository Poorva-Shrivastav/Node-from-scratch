const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

// /users/all-users
const users = [
  { id: 1, name: "PJ", displayName: "PJ" },
  { id: 2, name: "MJ", displayName: "MJ" },
  { id: 3, name: "JJ", displayName: "JJ" },
  { id: 4, name: "PMJ", displayName: "PMJ" },
  { id: 5, name: "MMJ", displayName: "MMJ" },
  { id: 6, name: "JMJ", displayName: "JMJ" },
];

router.get("/", (req, res) => {
  const { query } = req;
  const { filter, value } = query;
  if (filter && value)
    return res.send(users.filter((user) => user[filter].includes(value)));

  return res.send(users);
});

// /users/user-details

router.get("/:id", (req, res) => {
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) {
    return res.status(400).send("Bad request - " + req.params.id);
  }
  const findUser = users.find((user) => user.id === parseId);
  console.log(findUser);
  if (!findUser) return res.sendStatus(404);

  return res.send("Found user: " + findUser);
});

router.post("/", (req, res) => {
  users.push({ id: users[users.length - 1].id + 1, ...req.body });
  res.sendStatus(201);
});

router.put("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(400);

  users[findUserIndex] = { id: parsedId, ...body };
  res.sendStatus(200);
});

router.patch("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  console.log(users);
  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  users[findUserIndex] = { ...users[findUserIndex], ...body }; //taking all the existing user data in the object and updating it with the data sent in the body
  res.sendStatus(204);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  users.splice(findUserIndex, 1);
  console.log(users);

  res.sendStatus(200);
});
// router.get("/search-by-location/:state/:city", (req, res) => {
//   res.send("User details for " + req.params.state + req.params.city);
// });

// router.get("/search/:key([0-9]{4})", (req, res) => {
//   res.send(
//     "/search/:key([0-9]{4}) -> key can be only numbers with 4 digits validation " +
//       req.params.key
//   );
// });

// router.get("/search-username/:key([a-zA-Z]{5})", (req, res) => {
//   res.send(
//     "/search/:key([0-9]{4}) -> key can be only alphabets with 5 digits validation " +
//       req.params.key
//   );
// });

router.get("*", (req, res) => {
  let resObj = {
    statusCode: 404,
    statusMessage: "URL not found",
  };
  res.send(resObj);
});

module.exports = router;
