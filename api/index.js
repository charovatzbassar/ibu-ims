if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const { cors, session } = require("./config");
const {
  companyRouter,
  internshipListingRouter,
  authRouter,
  applicationRouter,
  internshipRouter,
  internshipDayRouter,
  internshipReportRouter,
  internRouter,
} = require("./routers");
const { APIError, constants } = require("./utils");
const swaggerDocs = require("./swagger/swagger-output.json");

const port = constants.API_PORT || 8080;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", constants.BASE_APP_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(session);

require("./auth");
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/google", authRouter);
app.use("/api/internship-listings", internshipListingRouter);
app.use("/api/companies", companyRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/internships", internshipRouter);
app.use("/api/internship-days", internshipDayRouter);
app.use("/api/internship-reports", internshipReportRouter);
app.use("/api/interns", internRouter);

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
