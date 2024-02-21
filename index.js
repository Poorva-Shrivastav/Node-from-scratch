const express = require("express");
const app = express();
const routes = require("./routes/index");

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(routes);

// app.use(loginMiddleware);

// function loginMiddleware(req, res, next) {
//   console.log(`req method : "${req.method}"  req url: "${req.url}"`);
//   next();
// }

app.get("*", (req, res) => {
  let resObj = {
    statusCode: 404,
    statusMessage: "URL not found",
  };
  res.send(resObj);
});

app.listen(PORT, () => console.log(`server is listing to ${PORT}`));
