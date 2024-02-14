const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getApplicationsByStatus: async (req, res) => {
    const { listingID, status } = req.params;

    const allApplications = await prisma.application.findMany({
      include: {
        internship_listing: true,
        intern: true,
      },
      where: {
        internship_listing: {
          listingID,
        },
        applicationStatus: status,
      },
    });

    res.json(allApplications);
  },
  modifyApplicationStatus: async (req, res) => {
    const { listingID } = req.params;
    const { status } = req.body;

    const updatedApplication = await prisma.application.updateMany({
      where: {
        listingID,
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

    const listing = await prisma.internship_listing.findUnique({
      where: {
        listingID,
      },
    });

    if (!intern || !listing) {
      return res.status(401).json({ error: "Unauthorized" });
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
