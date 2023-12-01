if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const internshipRoutes = require("./routers/internshipRouter");
const companyRoutes = require("./routers/companyRouter");
const APIError = require("./utils/APIError");
const app = express();

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

app.listen(process.env.API_PORT, () => {
  console.log("Server is listening");
});
