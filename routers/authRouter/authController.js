const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../../config");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(401)
          .json({ message: "Registration was failed", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(401)
          .json({ message: "User with this username already exist" });
      }
      const hashedPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return res.json({ message: "User was registered succesfully" });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ message: "User with this username undefined" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Password is incorrect" });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(401).json({ message: "Login error" });
    }
  }
}

module.exports = new authController();
