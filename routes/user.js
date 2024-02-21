const express = require("express");
const router = express.Router();
const {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} = require("express-validator");

const {
  createUserValidationSchemaPOST,
  createUserValidationSchemaGET,
} = require("../utils/validationSchemas");

const middlewareResolveIndexByUserId = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(400);
  req.findUserIndex = findUserIndex; // There's no way direct way we can pass data from one middleware to the other, but we can attach properties to the req obj dynamically
  next();
};

// /users/all-users
const users = [
  { id: 1, name: "PJ", displayName: "PJ" },
  { id: 2, name: "MJ", displayName: "MJ" },
  { id: 3, name: "JJ", displayName: "JJ" },
  { id: 4, name: "PMJ", displayName: "PMJ" },
  { id: 5, name: "MMJ", displayName: "MMJ" },
  { id: 6, name: "JMJ", displayName: "JMJ" },
];

router.get("/", checkSchema(createUserValidationSchemaGET), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    return res.send(users);
  }
  const { query } = req;
  const { filter, value } = query;
  if (filter && value)
    return res.send(users.filter((user) => user[filter].includes(value)));

  return res.send(users);
});

// /users/user-details

router.get("/:id", middlewareResolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const findUser = users.find((user) => user.id === users[findUserIndex].id);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

router.post("/", checkSchema(createUserValidationSchemaPOST), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const data = matchedData(req);
  users.push({ id: users[users.length - 1].id + 1, ...data });
  res.sendStatus(201);
});

router.put("/:id", middlewareResolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  res.sendStatus(200);
});

router.patch("/:id", middlewareResolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { ...users[findUserIndex], ...body }; //taking all the existing user data in the object and updating it with the data sent in the body
  res.sendStatus(204);
});

router.delete("/:id", middlewareResolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
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
