const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  createInternshipReport: async (req, res) => {
    const { internshipID } = req.params;
    const { report } = req.body;

    const internship = await prisma.internship.findUnique({
      where: {
        internshipID,
      },
    });

    if (!internship) {
      return res.status(400).json({ error: "Internship does not exist." });
    }

    const finalReport = await prisma.internship_report.create({
      data: {
        reportID: uuid(),
        internshipID,
        finalReport: report,
        status: "PENDING",
      },
    });

    const updatedInternship = await prisma.internship.update({
      where: {
        internshipID,
      },
      data: {
        status: "COMPLETED",
      },
    });

    res.json(finalReport);
  },
  getInternshipReport: async (req, res) => {
    const { internshipID, internID } = req.params;

    const intern = await prisma.intern.findUnique({
      where: {
        internID,
      },
    });

    if (!intern) {
      return res.status(400).json({ error: "Intern does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      where: {
        internshipID,
      },
    });

    if (!internship) {
      return res.status(400).json({ error: "Internship does not exist." });
    }

    const report = await prisma.internship_report.findFirst({
      where: {
        internshipID,
        internship: {
          internID,
        },
      },
    });

    res.json(report);
  },
  modifyInternshipReportStatus: async (req, res) => {
    const { reportID } = req.params;
    const { status } = req.body;

    const report = await prisma.internship_report.findUnique({
      where: {
        reportID,
      },
    });

    if (!report) {
      return res.status(400).json({ error: "Report does not exist." });
    }

    const modifiedReport = await prisma.internship_report.update({
      where: {
        reportID,
      },
      data: {
        status,
      },
    });

    res.json(modifiedReport);
  },
};
