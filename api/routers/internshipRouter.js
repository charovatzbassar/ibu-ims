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
  .route("/:internshipID")
  .get(checkRole("company"), catchAsync(internshipService.getInternship));

module.exports = router;
