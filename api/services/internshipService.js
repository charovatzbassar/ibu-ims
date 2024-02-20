const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternships: async (req, res) => {
    const userData =
      req.user.role === "company"
        ? await prisma.company.findFirst({
            where: {
              contactEmail: req.user.profile.emails[0].value,
            },
          })
        : await prisma.manager.findFirst({
            where: {
              email: req.user.profile.emails[0].value,
            },
          });

    if (!userData) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const internships = await prisma.internship.findMany({
      include: {
        company: true,
        intern: true,
        manager: true,
        internship_listing: true,
      },
      where: {
        status: "ONGOING",
        OR: [
          {
            companyID: userData.companyID,
          },
          {
            managerID: userData.managerID,
          },
        ],
      },
    });

    res.json(internships);
  },

  getInternship: async (req, res) => {
    const { internshipID } = req.params;

    const userData =
      req.user.role === "company"
        ? await prisma.company.findFirst({
            where: {
              contactEmail: req.user.profile.emails[0].value,
            },
          })
        : await prisma.manager.findFirst({
            where: {
              email: req.user.profile.emails[0].value,
            },
          });

    if (!userData) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      include: {
        company: true,
        intern: true,
        manager: true,
        internship_listing: true,
      },
      where: {
        internshipID,
        status: "ONGOING",
        OR: [
          {
            companyID: userData.companyID,
          },
          {
            managerID: userData.managerID,
          },
        ],
      },
    });

    res.json(internship);
  },

  getInternshipByIntern: async (req, res) => {
    const intern = await prisma.intern.findUnique({
      where: {
        email: req.user.profile.emails[0].value,
      },
    });

    if (!intern) {
      return res.status(400).json({ error: "Intern does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      include: {
        company: true,
        intern: true,
        manager: true,
        internship_listing: true,
      },
      where: {
        internID: intern.internID,
        status: "ONGOING",
      },
    });

    res.json(internship);
  },
  createInternship: async (req, res) => {
    const { interns, listingID } = req.body;

    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const foundListing = await prisma.internship_listing.findUnique({
      where: {
        listingID,
        companyID: company.companyID,
      },
    });

    if (!foundListing) {
      return res.status(400).json({ error: "Listing does not exist." });
    }

    const newInternships = interns.map(async (intern) => {
      return {
        internshipID: uuid(),
        companyID: company.companyID,
        listingID,
        internID: intern,
        managerID: "97f7397c-babe-47b2-814f-0fdb8958023d",
        status: "ONGOING",
        finalReport: "",
      };
    });

    const createdInternships = await prisma.internship.createMany({
      data: newInternships,
    });

    const listing = await prisma.internship_listing.update({
      where: {
        listingID,
      },
      data: {
        listingStatus: "INACTIVE",
      },
    });

    res.json(createdInternships);
  },
  createInternshipFinalReport: async (req, res) => {
    const { finalReport } = req.body;
    const { internshipID } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updatedInternship = await prisma.internship.update({
      where: {
        internshipID,
        companyID: company.companyID,
      },
      data: {
        finalReport,
        status: "COMPLETED",
      },
    });

    res.json(updatedInternship);
  },
};
