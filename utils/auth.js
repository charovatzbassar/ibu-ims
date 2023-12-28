const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const prisma = require("../prisma/prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (token, refreshToken, profile, done) => {
      let role;

      if (profile.emails[0].value.split("@")[1] === "stu.ibu.edu.ba") {
        const user = await prisma.intern.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          await prisma.intern.create({
            data: {
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          });
        }
        role = "intern";
      } else if (profile.emails[0].value.split("@")[1] === "ibu.edu.ba") {
        const user = await prisma.mentor.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          await prisma.mentor.create({
            data: {
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          });
        }
        role = "mentor";
      } else {
        const user = await prisma.company.findUnique({
          where: { contactEmail: profile.emails[0].value },
        });

        if (!user) {
          return done(new Error("Unauthorized"), false);
        }
        role = "company";
      }

      return done(null, {
        profile,
        token,
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
