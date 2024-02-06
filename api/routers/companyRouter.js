const express = require("express");
const { companyService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .get(catchAsync(companyService.addCompany))
  .post(catchAsync(companyService.createCompany));

router
  .route("/:id")
  .get(catchAsync(companyService.getCompany))
  .put(checkRole("company"), catchAsync(companyService.updateCompany))
  .delete(catchAsync(companyService.deleteCompany));

module.exports = router;
