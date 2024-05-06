const express = require("express");
const { internshipDayService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/:internshipID")
  .get(
    checkRole(["company"]),
    catchAsync(internshipDayService.getInternshipDays)
  )
  .post(
    checkRole(["intern"]),
    catchAsync(internshipDayService.createInternshipDay)
  );

router
  .route("/:internshipID/:date")
  .get(catchAsync(internshipDayService.getInternshipDayByDate));

router
  .route("/:internshipID/all")
  .put(
    checkRole(["company"]),
    catchAsync(internshipDayService.approveAllInternshipDays)
  );

router
  .route("/:dayID")
  .put(
    checkRole(["company"]),
    catchAsync(internshipDayService.modifyInternshipDayStatus)
  );

module.exports = router;
