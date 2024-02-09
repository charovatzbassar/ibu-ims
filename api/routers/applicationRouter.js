const express = require("express");
const { applicationService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .get(checkRole("company"), catchAsync(applicationService.getApplications))
  .post(checkRole("intern"), catchAsync(applicationService.createApplication));

module.exports = router;
