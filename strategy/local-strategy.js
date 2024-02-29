const passport = require("passport");
const Strategy = require("passport-local");
const users = require("../utils/constants");

const User = require("../mongoose/schemas/user");
const { comparePasswords } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside de-serializeUser");
  console.log(id);
  try {
    // const findUser = users.find((user) => user.id === id);
    const findUser = await User.findById(id);
    if (!findUser) throw new Error();
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

//verify function
const strategy = new Strategy(async (username, password, done) => {
  try {
    const findUser = await User.findOne({ username });

    if (!findUser) throw new Error("User not found");
    if (!comparePasswords(password, findUser.password))
      throw new Error("Bad Credentials");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

module.exports = strategy;
