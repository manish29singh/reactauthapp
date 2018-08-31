const bcrypt = require("bcrypt");
const Users = require("../models/Users");

module.exports.encryptPassword = async password => {
  try {
    let salt = await bcrypt.genSalt(10);
    if (salt) {
      let hashPass = await bcrypt.hash(password, salt);
      if (hashPass) return hashPass;
    }
  } catch (err) {
    console.log("Error while encrypting password", err.message);
    throw err;
  }
};

module.exports.matchPassword = async (candidatePassword, hashPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, hashPassword);
  } catch (err) {
    throw err;
  }
};

module.exports.userExists = async email => {
  try {
    return await Users.findOne({ email: email });
  } catch (err) {
    throw err;
  }
};
