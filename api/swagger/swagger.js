const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Internship API",
    description: "Endpoints",
  },
  host: "localhost:8080",
};

const outputFile = "./swagger-output.json";
const routes = ["../index.js"];

swaggerAutogen(outputFile, routes, doc);
