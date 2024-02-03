const express = require("express");
const { internshipListingService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .get(catchAsync(internshipListingService.getInternshipListings))
  .post(
    checkRole("company"),
    catchAsync(internshipListingService.createInternshipListing)
  );

router
  .route("/:id")
  .get(catchAsync(internshipListingService.getInternshipListing))
  .patch(
    checkRole("company"),
    catchAsync(internshipListingService.updateInternshipListing)
  )
  .delete(
    checkRole("company"),
    catchAsync(internshipListingService.deleteInternshipListing)
  );

module.exports = router;