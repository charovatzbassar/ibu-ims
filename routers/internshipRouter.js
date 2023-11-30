const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const data = await prisma.internship_listing.findMany();
  res.json(data);
});

router.post("/new", async (req, res) => {
  const newListing = await prisma.internship_listing.create({
    data: {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    },
  });
  res.json(newListing);
});

router.get("/:id", async (req, res) => {
  const listing = await prisma.internship_listing.findUnique({
    where: {
      listingID: Number(req.params.id),
    },
  });

  res.json(listing);
});

router.patch("/:id/edit", async (req, res) => {
  const updatedListing = await prisma.internship_listing.update({
    where: {
      listingID: Number(req.params.id),
    },
    data: {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    },
  });

  res.json(updatedListing);
});

router.delete("/:id/delete", async (req, res) => {
  const deletedListing = await prisma.internship_listing.delete({
    where: {
      listingID: Number(req.params.id),
    },
  });

  res.json(deletedListing);
});

module.exports = router;
