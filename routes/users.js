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

const User = require("../mongoose/schemas/user");
const { hashedPassword } = require("../utils/helpers");
const passport = require("passport");

router.get("/", checkSchema(createUserValidationSchemaGET), (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw new Error();
    }
    console.log("Inside session store GET");
    console.log(sessionData);
  });

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

router.post(
  "/",
  checkSchema(createUserValidationSchemaPOST),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ err: result.array() });
    const data = matchedData(req);
    data.password = hashedPassword(data.password);

    const newUser = new User(data); //creating new row in the users table
    try {
      const savedUser = await newUser.save(); //saving data to that row
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(401);
    }
  }
);
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
