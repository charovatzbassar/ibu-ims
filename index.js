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
const auth = require("./utils/auth");
const { createJwtToken } = require("./utils/jwt");

const port = 8080;
const appPort = 5173;

const app = express();

auth(passport);
app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    origin: "http://localhost:" + appPort,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "session cookie not set",
  });
});
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const token = createJwtToken(req.user); 
    res.redirect(`/dashboard?token=${token}`);
  }
);

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
