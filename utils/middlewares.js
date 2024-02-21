const users = require("./constants");

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

module.exports = middlewareResolveIndexByUserId;
