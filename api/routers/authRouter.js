const express = require("express");
const passport = require("passport");

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
    res.redirect("http://localhost:5173");
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("connect.sid", {
    path: "/",
    domain: "localhost",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", // Set 'secure' based on the request protocol
    sameSite: "None",
    expires: new Date(0),
  });

  res.json({ msg: "Logged out" });
});

module.exports = router;
