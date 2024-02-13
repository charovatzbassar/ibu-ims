const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getApplications: async (req, res) => {
    const allApplications = await prisma.application.findMany({
      include: {
        internship_listing: true,
        intern: true,
      },
      where: {
        internship_listing: {
          listingID: req.params.listingID,
        }
      },
    });

    res.json(allApplications);
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
