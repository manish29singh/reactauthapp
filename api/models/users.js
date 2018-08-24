const Mongoose = require("mongoose");

let UserSchema = Mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports["Users"] = Mongoose.model("User", UserSchema);
