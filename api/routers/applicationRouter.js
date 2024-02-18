const express = require("express");
const { applicationService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .post(
    checkRole(["intern"]),
    catchAsync(applicationService.createApplication)
  );

router
  .route("/:applicationID")
  .put(
    checkRole(["company"]),
    catchAsync(applicationService.modifyApplicationStatus)
  );

router
  .route("/:listingID/:status")
  .get(
    checkRole(["company"]),
    catchAsync(applicationService.getApplicationsByStatus)
  );

module.exports = router;
