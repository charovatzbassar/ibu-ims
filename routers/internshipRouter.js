const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const data = await prisma.internship_listing.findMany();
  res.json(data);
});

module.exports = router;
