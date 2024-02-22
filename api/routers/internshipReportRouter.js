const express = require("express");
const { internshipReportService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/:reportID")
  .put(
    checkRole(["manager"]),
    catchAsync(internshipReportService.modifyInternshipReportStatus)
  );

router
  .route("/:internshipID")
  .post(
    checkRole(["company"]),
    catchAsync(internshipReportService.createInternshipReport)
  );

router
  .route("/:internshipID")
  .get(
    checkRole(["manager"]),
    catchAsync(internshipReportService.getInternshipReport)
  );

module.exports = router;
