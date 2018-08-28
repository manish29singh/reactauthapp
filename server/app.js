const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV == "production";

const app = express();

mongoose.connect(
  "mongodb://localhost/lightblog",
  () => {
    console.log("Connected to mongodb.");
  }
);

require("./models/Articles");

const routes = require("./routes/api/articles");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "myapp",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

app.use(require("./routes"));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), () =>
  console.log("Server started at port : ", app.get("port"))
);
