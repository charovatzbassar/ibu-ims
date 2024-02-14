const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const prisma = require("../prisma");
const { sign } = require("jsonwebtoken");
const { APIError } = require("../utils");
const { v4: uuid } = require("uuid");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
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
              internID: uuid(),
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          });
        }
        role = "intern";
      } else if (profile.emails[0].value.split("@")[1] === "ibu.edu.ba") {
        const user = await prisma.manager.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          await prisma.manager.create({
            data: {
              managerID: uuid(),
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          });
        }
        role = "manager";
      } else {
        const user = await prisma.company.findUnique({
          where: { contactEmail: profile.emails[0].value },
        });

        if (!user) {
          return done(new APIError("Unauthorized", 401), false);
        }
        role = "company";
      }

      const jwtToken = sign(
        {
          profile,
          token,
          role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return done(null, {
        profile,
        token,
        role,
        jwtToken,
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
