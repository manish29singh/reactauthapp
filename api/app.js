const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/reactauthapp",
  () => {
    console.log("Connected to mongodb.");
  }
);

const routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.set("port", process.env.PORT || 3004);

app.listen(app.get("port"), () =>
  console.log("Server started at port : ", app.get("port"))
);
