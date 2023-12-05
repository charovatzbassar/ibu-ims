const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      (token, refreshToken, profile, done) => {
        return done(null, {
          profile: profile,
          token: token,
        });
      }
    )
  );
};
