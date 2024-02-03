const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternshipListings: async (req, res) => {
    const allListings = await prisma.internship_listing.findMany();
    res.json(allListings);
  },
  createInternshipListing: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    const newListing = await prisma.internship_listing.create({
      data: {
        listingID: uuid().toString(),
        companyID: Number(company.companyID),
        ...req.body,
        ...(req.body.startDate
          ? { startDate: new Date(req.body.startDate) }
          : {}),
        ...(req.body.endDate ? { endDate: new Date(req.body.endDate) } : {}),
      },
    });
    res.json(newListing);
  },
  getInternshipListing: async (req, res) => {
    const listing = await prisma.internship_listing.findUnique({
      where: {
        listingID: Number(req.params.id),
      },
    });

    res.json(listing);
  },
  updateInternshipListing: async (req, res) => {
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
  },
  deleteInternshipListing: async (req, res) => {
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
  },
};
