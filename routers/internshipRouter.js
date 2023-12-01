const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { catchAsync } = require("../utils/catchAsync");

const router = express.Router();
const prisma = new PrismaClient();

router
  .route("/")
  .get(
    catchAsync(async (req, res) => {
      const data = await prisma.internship_listing.findMany();
      res.json(data);
    })
  )
  .post(
    catchAsync(async (req, res) => {
      const newListing = await prisma.internship_listing.create({
        data: {
          ...req.body,
          ...(req.body.startDate
            ? { startDate: new Date(req.body.startDate) }
            : {}),
          ...(req.body.endDate ? { endDate: new Date(req.body.endDate) } : {}),
        },
      });
      res.json(newListing);
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req, res) => {
      const listing = await prisma.internship_listing.findUnique({
        where: {
          listingID: Number(req.params.id),
        },
      });

      res.json(listing);
    })
  )
  .patch(
    catchAsync(async (req, res) => {
      const updatedListing = await prisma.internship_listing.update({
        where: {
          listingID: Number(req.params.id),
        },
        data: {
          ...req.body,
          ...(req.body.startDate
            ? { startDate: new Date(req.body.startDate) }
            : {}),
          ...(req.body.endDate ? { endDate: new Date(req.body.endDate) } : {}),
        },
      });

      res.json(updatedListing);
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const deletedListing = await prisma.internship_listing.delete({
        where: {
          listingID: Number(req.params.id),
        },
      });

      res.json(deletedListing);
    })
  );

module.exports = router;
