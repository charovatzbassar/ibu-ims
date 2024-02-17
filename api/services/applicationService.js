const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getApplicationsByStatus: async (req, res) => {
    const { listingID, status } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        email: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const listing = await prisma.internship_listing.findUnique({
      where: {
        listingID,
        companyID: company.companyID,
      },
    });

    if (!listing) {
      return res
        .status(400)
        .json({ error: "Internship listing does not exist." });
    }

    const allApplications = await prisma.application.findMany({
      include: {
        internship_listing: true,
        intern: true,
      },
      where: {
        internship_listing: {
          listingID,
          companyID: company.companyID,
        },
        applicationStatus: status,
      },
    });

    res.json(allApplications);
  },
  modifyApplicationStatus: async (req, res) => {
    const { applicationID } = req.params;
    const { status } = req.body;

    const company = await prisma.company.findUnique({
      where: {
        email: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const updatedApplication = await prisma.application.updateMany({
      where: {
        applicationID,
        internship_listing: {
          companyID: company.companyID,
        },
      },
      data: {
        applicationStatus: status,
      },
    });

    res.json(updatedApplication);
  },
  createApplication: async (req, res) => {
    const { listingID } = req.body;

    const intern = await prisma.intern.findUnique({
      where: {
        email: req.user.profile.emails[0].value,
      },
    });

    if (!intern) {
      return res.status(400).json({ error: "Intern does not exist." });
    }

    const listing = await prisma.internship_listing.findUnique({
      where: {
        listingID,
      },
    });

    if (!listing) {
      return res
        .status(400)
        .json({ error: "Internship listing does not exist." });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        listingID,
        internID: intern.internID,
      },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied for this listing." });
    }

    const ongoingInternship = await prisma.internship.findUnique({
      where: {
        internID: intern.internID,
        status: "ONGOING",
      },
    });

    if (ongoingInternship) {
      return res
        .status(400)
        .json({ error: "You already have an ongoing internship." });
    }

    const newApplication = await prisma.application.create({
      data: {
        applicationID: uuid(),
        listingID,
        internID: intern.internID,
        applicationStatus: "PENDING",
      },
    });

    res.json(newApplication);
  },
};
