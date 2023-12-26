const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {}
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = router;
