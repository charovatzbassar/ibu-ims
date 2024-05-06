const prisma = require("../prisma");
const { v4: uuid } = require("uuid");
const { getIntern } = require("./internsService");

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
  getInternshipDayByDate: async (req, res) => {
    const { date, internshipID } = req.params;

    const internshipDay = await prisma.internship_day.findFirst({
      where: {
        internshipID,
        workdayDate: date,
      },
    });

    return res.json(internshipDay);
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
      return res.status(400).json({ message: "Intern does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      include: {
        internship_listing: true,
      },
      where: {
        internshipID,
        internID: intern.internID,
      },
    });

    if (!internship) {
      return res.status(400).json({ message: "Internship does not exist." });
    }

    const currentDate = new Date();

    if (currentDate < new Date(internship.internship_listing.startDate)) {
      return res.status(400).json({
        message: "Your internship has not started yet.",
      });
    }

    if (currentDate > new Date(internship.internship_listing.endDate)) {
      return res.status(400).json({
        message: "Your internship has ended.",
      });
    }

    const existingInternshipDay = await prisma.internship_day.findFirst({
      where: {
        internshipID,
        workdayDate: currentDate.toISOString().slice(0, 10),
      },
    });

    if (existingInternshipDay) {
      return res.status(400).json({
        message: "You have already filled out today's date. See you tomorrow!",
      });
    }

    const newInternshipDay = await prisma.internship_day.create({
      data: {
        dayID: uuid(),
        dayDescription: description,
        internshipID,
        status: "PENDING",
        workdayDate: currentDate.toISOString().slice(0, 10),
      },
    });

    return res.json(newInternshipDay);
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
      return res.status(400).json({ message: "Company does not exist." });
    }

    const day = await prisma.internship_day.findUnique({
      where: {
        dayID,
        internship: {
          companyID: company.companyID,
        },
      },
    });

    if (!day) {
      return res.status(400).json({ message: "Day does not exist." });
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
      return res.status(400).json({ message: "Company does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      where: {
        internshipID,
        companyID: company.companyID,
      },
    });

    if (!internship) {
      return res.status(400).json({ message: "Internship does not exist." });
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
