const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Username can't be empty").notEmpty(),
    check("password", "Password need to be more than 8 symbols").isLength({
      min: 8,
      max: 100,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);

module.exports = router;
