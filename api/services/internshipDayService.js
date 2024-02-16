const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternshipDays: async (req, res) => {
    const { internshipID } = req.params;

    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internshipDays = await prisma.internship_day.findMany({
      include: {
        internship: true,
      },
      where: {
        internshipID,
        status: "PENDING",
        internship: {
          companyID: company.companyID,
        },
      },
    });

    return res.json(internshipDays);
  },
  createInternshipDay: async (req, res) => {
    const { internshipID } = req.params;
    const { description } = req.body;

    const intern = await prisma.intern.findUnique({
      where: {
        email: req.user.profile.emails[0].value,
      },
    });

    if (!intern) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internshipDay = await prisma.internship_day.create({
      data: {
        dayID: uuid(),
        dayDescription: description,
        internshipID,
        status: "PENDING",
        workdayDate: new Date(),
      },
    });

    return res.json(internshipDay);
  },
  modifyInternshipDayStatus: async (req, res) => {
    const { dayID } = req.params;
    const { status } = req.body;

    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internshipDay = await prisma.internship_day.update({
      include: {
        internship: true,
      },
      where: {
        dayID,
        internship: {
          companyID: company.companyID,
        },
      },
      data: {
        status,
      },
    });

    return res.json(internshipDay);
  },

  approveAllInternshipDays: async (req, res) => {
    const { internshipID } = req.params;
    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internship = await prisma.internship.findUnique({
      where: {
        internshipID,
        companyID: company.companyID,
      },
    });

    if (!internship) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const internshipDay = await prisma.internship_day.updateMany({
      where: {
        internshipID,
        status: "PENDING",
      },
      data: {
        status: "APPROVED",
      },
    });

    return res.json(internshipDay);
  },
};
