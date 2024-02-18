const express = require("express");
const { internshipService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .post(checkRole("company"), catchAsync(internshipService.createInternship))
  .get(
    checkRole(["company", "manager"]),
    catchAsync(internshipService.getInternships)
  );

router
  .route("/intern")
  .get(
    checkRole(["intern"]),
    catchAsync(internshipService.getInternshipByIntern)
  );

router
  .route("/:internshipID")
  .get(
    checkRole(["company", "manager"]),
    catchAsync(internshipService.getInternship)
  );

router
  .route("/:internshipID/report")
  .put(
    checkRole(["company"]),
    catchAsync(internshipService.createInternshipFinalReport)
  );

module.exports = router;
