const jwt = require("jsonwebtoken");

module.exports.createJwtToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports.verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
