if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const internshipRoutes = require("./routers/internshipRouter");
const companyRoutes = require("./routers/companyRouter");
const APIError = require("./utils/APIError");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger-output.json");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const port = 8080;
const appPort = 5173;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = { id: profile.id, email: profile.emails[0].value };
      return done(null, user);
    }
  )
);

app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    origin: "http://localhost:" + appPort,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/internships", internshipRoutes);
app.use("/api/companies", companyRoutes);

app.all("*", (req, res, next) => {
  next(new APIError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong :/";
  res.status(status).json({ message: err.message, status });
});

app.listen(port, () => {
  console.log("Server is listening");
});
