const express = require("express");
const { internshipService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .get(checkRole("company"), catchAsync(internshipService.getInternships))
  .post(checkRole("company"), catchAsync(internshipService.createInternship));

router
  .route("/intern")
  .get(
    checkRole("intern"),
    catchAsync(internshipService.getInternshipByIntern)
  );

router
  .route("/:internshipID")
  .get(checkRole("company"), catchAsync(internshipService.getInternship))
  .put(
    checkRole("company"),
    catchAsync(internshipService.createInternshipFinalReport)
  );

module.exports = router;
