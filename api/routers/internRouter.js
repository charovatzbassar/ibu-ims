const express = require("express");
const { internsService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);

router
  .route("/")
  .get(checkRole(["manager"]), catchAsync(internsService.getInterns));

router
  .route("/:internID")
  .get(checkRole(["manager"]), catchAsync(internsService.getIntern));

module.exports = router;
