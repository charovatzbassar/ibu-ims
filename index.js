if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const internshipRoutes = require("./routers/internshipRouter");
const companyRoutes = require("./routers/companyRouter");
const authRoutes = require("./routers/authRouter");
const APIError = require("./utils/APIError");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swagger-output.json");
const passport = require("passport");
const session = require("./utils/session");

const port = process.env.API_PORT || 8080;
const appPort = process.env.APP_PORT || 5173;

const app = express();

app.use(session);

require("./utils/auth");
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    origin: "http://localhost:" + appPort,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/google", authRoutes);
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
