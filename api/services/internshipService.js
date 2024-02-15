const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternships: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    const internships = await prisma.internship.findMany({
      include: {
        company: true,
        intern: true,
        manager: true,
      },
      where: {
        company: {
          companyID: company.companyID,
        },
      },
    });

    res.json(internships);
  },
  createInternship: async (req, res) => {
    const { companyID, interns } = req.body;

    const newInternships = interns.map((intern) => {
      return {
        internshipID: uuid(),
        companyID,
        internID: intern,
        managerID: "97f7397c-babe-47b2-814f-0fdb8958023d",
        status: "ONGOING",
        finalReport: "",
      };
    });

    const createdInternships = await prisma.internship.createMany({
      data: newInternships,
    });

    res.json(createdInternships);
  },
};
