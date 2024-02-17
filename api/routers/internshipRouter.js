const express = require("express");
const { internshipService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .post(checkRole("company"), catchAsync(internshipService.createInternship));

router
  .route("/company")
  .get(
    checkRole("company"),
    catchAsync(internshipService.getInternshipsCompany)
  );

router
  .route("/intern")
  .get(
    checkRole("intern"),
    catchAsync(internshipService.getInternshipByIntern)
  );

router
  .route("/manager")
  .get(
    checkRole("manager"),
    catchAsync(internshipService.getInternshipsManager)
  );

router
  .route("/:internshipID")
  .put(
    checkRole("company"),
    catchAsync(internshipService.createInternshipFinalReport)
  );

router
  .route("/:internshipID/company")
  .get(
    checkRole("company"),
    catchAsync(internshipService.getInternshipCompany)
  );

router
  .route("/:internshipID/manager")
  .get(
    checkRole("manager"),
    catchAsync(internshipService.getInternshipManager)
  );

module.exports = router;
