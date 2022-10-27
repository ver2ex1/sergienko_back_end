const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Not authorizied" });
    }
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Not authorizied" });
  }
};
