const express = require("express");
const passport = require("passport");
const { constants } = require("../utils");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  }),
  (req, res) => {}
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(`${constants.BASE_APP_URL}/home/dashboard`);
  }
);

router.get("/logout", (req, res) => {
  res
    .clearCookie("connect.sid", {
      path: "/",
    })
    .status(200)
    .json({ msg: "Logged out" });
});

router.get("/user", (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

module.exports = router;
