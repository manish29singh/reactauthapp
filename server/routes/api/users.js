const router = require("express").Router();
const Users = require("../../models/Users");
const util = require("../../utils/index");

/**
 * User Signup
 */
router.post("/signup", async (req, res) => {
  if (req.body.email && req.body.password && req.body.name) {
    if (await util.userExists(req.body.email)) {
      return res.json({ sucess: false, message: "User already exists." });
    }
    try {
      let User = new Users({
        name: req.body.name,
        email: req.body.email,
        password: await util.encryptPassword(req.body.password)
      });

      let newUser = await User.save();
      if (newUser) {
        res.json({
          success: true,
          message: "User registration successful",
          data: newUser
        });
      }
    } catch (err) {
      console.log("Error occured while regisering user: ", err.message);
      res.json(err.message);
    }
  } else {
    res.json({ message: "Fields can not be empty" });
  }
});

/**
 * User Login
 */
router.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      let user = await Users.findOne({ email: req.body.email.trim() });
      if (user) {
        if (await util.matchPassword(req.body.password, user.password)) {
          res.json({
            id: user._id,
            name: user.name,
            email: user.email
          });
        } else {
          res.json({ message: "Credentials invalid" });
        }
      } else {
        res.json({ message: "User not found" });
      }
    } catch (err) {
      res.json({ error_message: err.message });
    }
  } else {
    res.json({ message: "Fields can not be empty" });
  }
});

/**
 * User List
 */
router.get("/user-list", async (req, res) => {
  try {
    let users = await Users.find();
    if (users) console.log("user list : ", users);
    res.json({ userlist: users });
  } catch (err) {
    res.json({ errormessage: err.message });
  }
});

module.exports = router;
