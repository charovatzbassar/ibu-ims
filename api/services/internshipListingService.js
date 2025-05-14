const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternshipListings: async (req, res) => {
    const { searchTerm, skip, take } = req.query;

    const allListings = await prisma.internship_listing.findMany({
      include: {
        company: true,
      },
      where: {
        listingStatus: "ACTIVE",
        OR: [
          {
            position: {
              contains: searchTerm,
            },
          },
          {
            company: {
              companyName: {
                contains: searchTerm,
              },
            },
          },
        ],
      },
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 10,
    });
    res.json(allListings);
  },
  createInternshipListing: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (startDate.getTime() < new Date().getTime()) {
      return res
        .status(400)
        .json({ error: "Start date must be in the future." });
    }

    if (startDate.getTime() > endDate.getTime()) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date." });
    }

    const newListing = await prisma.internship_listing.create({
      data: {
        listingID: uuid(),
        companyID: company.companyID,
        ...req.body,
        ...(req.body.startDate ? { startDate } : {}),
        ...(req.body.endDate ? { endDate } : {}),
        listingStatus: "ACTIVE",
      },
    });
    res.json(newListing);
  },
  getInternshipListing: async (req, res) => {
    const listing = await prisma.internship_listing.findUnique({
      where: {
        listingID: req.params.id,
      },
      include: {
        company: true,
        application: true,
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

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (startDate.getTime() < new Date().getTime()) {
      return res
        .status(400)
        .json({ error: "Start date must be in the future." });
    }

    if (startDate.getTime() > endDate.getTime()) {
      return res
        .status(400)
        .json({ error: "Start date must be before end date." });
    }

    const updatedListing = await prisma.internship_listing.update({
      where: {
        listingID: req.params.id,
        companyID: company.companyID,
      },
      data: {
        ...req.body,
        ...(req.body.startDate ? { startDate } : {}),
        ...(req.body.endDate ? { endDate } : {}),
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

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const deletedApplications = await prisma.application.deleteMany({
      where: {
        listingID: req.params.id,
        internship_listing: {
          companyID: company.companyID,
        },
      },
    });

    const deletedListing = await prisma.internship_listing.delete({
      where: {
        listingID: req.params.id,
        companyID: company.companyID,
      },
    });

    res.json(deletedListing);
  },

  getInternshipListingsByCompany: async (req, res) => {
    const allListings = await prisma.internship_listing.findMany({
      include: {
        company: true,
      },
      where: {
        listingStatus: "ACTIVE",
        company: {
          contactEmail: {
            equals: req.user.profile.emails[0].value,
          },
        },
      },
    });
    res.json(allListings);
  },
};
