const express = require("express");
const router = express.Router();
const users = require("../utils/constants");
const middlewareResolveIndexByUserId = require("../utils/middlewares");
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

router.get("/", checkSchema(createUserValidationSchemaGET), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(req.session.id);
    return res.send(users);
  }
  const data = matchedData(req);
  console.log(data.filter);

  const { query } = req;
  const { filter, value } = query;
  if (filter && value)
    return res.send(users.filter((user) => user[filter].includes(value)));

  return res.send(users);
});

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

module.exports = router;
