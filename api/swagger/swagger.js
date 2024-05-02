const { constants } = require("../utils");

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "IBU IMS API",
    description: "Endpoints",
  },
  host: constants.BASE_API_URL.split("://")[1],
};

const outputFile = "./swagger-output.json";
const routes = ["../index.js"];

swaggerAutogen(outputFile, routes, doc);
