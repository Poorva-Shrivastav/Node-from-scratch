const passport = require("passport");
const Strategy = require("passport-local");
const users = require("../utils/constants");

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside de-serializeUser");
  console.log(id);
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error();
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

//verify function
const strategy = new Strategy((username, password, done) => {
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  try {
    const findUser = users.find((user) => user.username === username);
    if (!findUser) throw new Error("User not found");
    if (!findUser.password === password) throw new Error("Password not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

module.exports = strategy;
