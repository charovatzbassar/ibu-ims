const cors = require("cors");

const appPort = process.env.APP_PORT || 5173;

module.exports = cors({
  origin: "http://localhost:" + appPort,
  credentials: true,
});
