const express = require("express");
const prisma = require("../prisma/prisma");
const { catchAsync } = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/isLoggedIn");

const router = express.Router();

router
  .route("/")
  .get(
    catchAsync(async (req, res) => {
      const allListings = await prisma.internship_listing.findMany();
      res.json(allListings);
    })
  )
  .post(
    isLoggedIn,
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
    isLoggedIn,
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
    isLoggedIn,
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
