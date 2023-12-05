const jwt = require("jsonwebtoken");

module.exports.createJwtToken = (user) => {
  const payload = {};
  const secretKey = "your-secret-key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

module.exports.verifyJwtToken = (token) => {
  const secretKey = "your-secret-key";
  return jwt.verify(token, secretKey);
};
