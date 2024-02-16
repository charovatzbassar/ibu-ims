const express = require("express");
const { internshipDayService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router
  .route("/:internshipID")
  .post(
    checkAuth,
    checkRole("intern"),
    catchAsync(internshipDayService.createInternshipDay)
  );

router
  .route("/:dayID")
  .put(
    checkAuth,
    checkRole("company"),
    catchAsync(internshipDayService.modifyInternshipDayStatus)
  );

module.exports = router;
