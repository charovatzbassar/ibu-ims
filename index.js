if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const internshipRoutes = require("./routers/internshipRouter");
const app = express();

app.use("/api/internships", internshipRoutes);

app.listen(process.env.API_PORT, () => {
  console.log("Server is listening");
});
