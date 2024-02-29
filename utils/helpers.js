const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPwd = bcrypt.hashSync(password, salt);
  return hashedPwd;
};

const comparePasswords = (plainPwd, hashedPwd) => {
  return bcrypt.compareSync(plainPwd, hashedPwd);
};
module.exports = { hashedPassword, comparePasswords };
