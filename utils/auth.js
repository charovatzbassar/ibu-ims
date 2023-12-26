const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    (token, refreshToken, profile, done) => {
      let role;

      if (profile.emails[0].value.split("@")[1] === "stu.ibu.edu.ba") {
        role = "intern";
      } else if (profile.emails[0].value.split("@")[1] === "ibu.edu.ba") {
        role = "mentor";
      } else {
        role = "company";
      }

      return done(null, {
        profile: profile,
        token: token,
        role,
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
