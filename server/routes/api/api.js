const router = require("express").Router();

router.use("/user", require("./users"));
router.use("/articles", require("./articles"));

module.exports = router;
