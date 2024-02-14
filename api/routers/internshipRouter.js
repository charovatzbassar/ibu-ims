const express = require("express");
const { internshipService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .post(checkRole("company"), catchAsync(internshipService.createInternship));

module.exports = router;
