const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.write("Hello World");
  res.end();
});

module.exports = Router;
