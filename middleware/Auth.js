const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSecretKey = config.get("JWT_SECRET_KEY");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecretKey);

    req.userId = decodedToken.id;
    next();
  } catch (err) {
    return res.status(500).json({ msg: 'Token is not valid' });
  }
};
