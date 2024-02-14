const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  createInternship: async (req, res) => {
    const { companyID, internID } = req.body;

    const internship = await prisma.internship.create({
      data: {
        internshipID: uuid(),
        companyID,
        internID,
        managerID: "97f7397c-babe-47b2-814f-0fdb8958023d",
        status: "ONGOING",
      },
    });

    res.json(internship);
  },
};
