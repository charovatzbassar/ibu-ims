const express = require("express");
const { companyService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);
router.use(checkRole(["admin"]));

router
  .route("/")
  .get(catchAsync(companyService.addCompany))
  .post(catchAsync(companyService.createCompany));

router
  .route("/:id")
  .get(catchAsync(companyService.getCompany))
  .put(catchAsync(companyService.updateCompany))

router.route("/:id/status").put(catchAsync(companyService.changeCompanyStatus));

module.exports = router;
