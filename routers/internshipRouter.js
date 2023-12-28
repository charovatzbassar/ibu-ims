const express = require("express");
const prisma = require("../prisma/prisma");
const { catchAsync } = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { checkRole } = require("../middleware/checkRole");

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
    checkRole("company"),
    catchAsync(async (req, res) => {
      const company = await prisma.company.findUnique({
        where: {
          contactEmail: req.user.profile.emails[0].value,
        },
      });

      const newListing = await prisma.internship_listing.create({
        data: {
          companyID: Number(company.companyID),
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
    checkRole("company"),
    catchAsync(async (req, res) => {
      const company = await prisma.company.findUnique({
        where: {
          contactEmail: req.user.profile.emails[0].value,
        },
      });

      const listing = await prisma.internship_listing.findUnique({
        where: {
          companyID: Number(company.companyID),
        },
      });

      if (!listing) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const updatedListing = await prisma.internship_listing.update({
        where: {
          listingID: Number(req.params.id),
          companyID: Number(company.companyID),
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
    checkRole("company"),
    catchAsync(async (req, res) => {
      const company = await prisma.company.findUnique({
        where: {
          contactEmail: req.user.profile.emails[0].value,
        },
      });

      const listing = await prisma.internship_listing.findUnique({
        where: {
          companyID: Number(company.companyID),
        },
      });

      if (!listing) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const deletedListing = await prisma.internship_listing.delete({
        where: {
          listingID: Number(req.params.id),
          companyID: Number(company.companyID),
        },
      });

      res.json(deletedListing);
    })
  );

module.exports = router;
