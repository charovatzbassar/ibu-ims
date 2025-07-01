const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const prisma = require("../prisma");
const { sign } = require("jsonwebtoken");
const { APIError } = require("../utils");
const { v4: uuid } = require("uuid");
const { constants } = require("../utils");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: `${constants.BASE_API_URL}/api/auth/google/callback`,
    },
    async (token, refreshToken, profile, done) => {
      let role;
      const googleEmail = profile.emails[0].value;
      const givenName = profile.name.givenName;
      const familyName = profile.name.familyName;
      const emailDomain = googleEmail.split("@")[1];

      switch (emailDomain) {
        case "ibu.edu.ba":
          const intern = await prisma.intern.findUnique({
            where: { email: googleEmail },
          });

          if (!intern) {
            prisma.intern.create({
              data: {
                internID: uuid(),
                email: googleEmail,
                firstName: givenName,
                lastName: familyName,
              },
            });
          }

          role = "intern";
          break;

        case "stu.ibu.edu.ba":
          const [manager, admin] = await Promise.all([
            prisma.manager.findUnique({
              where: { email: googleEmail, status: "ACTIVE" },
            }),
            prisma.admin.findUnique({
              where: { email: googleEmail },
            }),
          ]);

          if (admin) {
            role = "admin";
          } else if (manager) {
            role = "manager";
          } else {
            return done(new APIError("Unauthorized", 401), false);
          }
          break;

        default:
          const company = await prisma.company.findUnique({
            where: { contactEmail: googleEmail, status: "ACTIVE" },
          });

          if (!company) {
            return done(new APIError("Unauthorized", 401), false);
          }
          role = "company";
          break;
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
