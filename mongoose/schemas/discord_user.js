const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DiscordUserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  discordId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

const DiscordUser = mongoose.model("DiscordUser", DiscordUserSchema);

module.exports = DiscordUser;
