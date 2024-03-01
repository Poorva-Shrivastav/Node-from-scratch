const passport = require("passport");
const Strategy = require("passport-discord");
const { findOne } = require("../mongoose/schemas/user");
const DiscordUser = require("../mongoose/schemas/discord_user");

passport.serializeUser((user, done) => {
  console.log("Inside serializeUser");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside de-serializeUser");
  console.log(id);
  try {
    const findUser = await DiscordUser.findById(id);
    if (!findUser) throw new Error();
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

const discordStrategy = new Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/auth/discord/redirect",
    scope: ["identify", "guilds", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    //accessToken, refreshToken are managed by passport
    let findUser;
    try {
      findUser = await DiscordUser.findOne({ discordId: profile.id });
    } catch (err) {
      return done(err, null);
    }
    try {
      if (!findUser) {
        const newUser = new DiscordUser({
          username: profile.username,
          discordId: profile.id,
        });
        const newSavedUser = await newUser.save();
        return done(null, newSavedUser);
      }
      return done(null, findUser);
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  }
);

module.exports = discordStrategy;
