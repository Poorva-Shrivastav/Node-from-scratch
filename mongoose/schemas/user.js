const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayname: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
