const express = require("express");
const app = express();
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

app.use(express.json());
app.use(cookieParser("signed")); //making the cookies signed
app.use(
  session({
    secret: "something complicated not guessable",
    saveUninitialized: false, //we don't want to save data of every user visiting the website
    resave: false,
    cookie: {
      maxAge: 60000 * 60, //1 hr
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 8000;
// app.use(loginMiddleware);

// function loginMiddleware(req, res, next) {
//   console.log(`req method : "${req.method}"  req url: "${req.url}"`);
//   next();
// }

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true; //remembers the session id
  res.cookie("hello", "world!", { maxAge: 60000 * 60, signed: true }); //1 min - 60000 mil sec
  return res.status(201).send("Welcome");
});

app.get("*", (req, res) => {
  let resObj = {
    statusCode: 404,
    statusMessage: "URL not found",
  };
  res.send(resObj);
});

app.listen(PORT, () => console.log(`server is listing to ${PORT}`));
