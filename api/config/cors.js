const cors = require("cors");
const { constants } = require("../utils");

module.exports = cors({
  origin: constants.BASE_APP_URL,
  credentials: true,
});
