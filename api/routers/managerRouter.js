const express = require("express");
const { managerService } = require("../services");
const { catchAsync } = require("../utils");
const { checkAuth, checkRole } = require("../middleware");

const router = express.Router();

router.use(checkAuth);
router.use(checkRole(["admin"]));

router
  .route("/")
  .get(catchAsync(managerService.addManager))
  .post(catchAsync(managerService.createManager));

router
  .route("/:id")
  .get(catchAsync(managerService.getManager))
  .put(catchAsync(managerService.updateManager));

router.route("/:id/status").put(catchAsync(managerService.changeManagerStatus));

module.exports = router;
