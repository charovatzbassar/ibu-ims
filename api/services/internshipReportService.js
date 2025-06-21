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

    await prisma.internship.update({
      where: {
        internshipID,
      },
      data: {
        status: "PENDING",
      },
    });

    res.json(finalReport);
  },
  getInternshipReport: async (req, res) => {
    const { internshipID } = req.params;

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
      },
    });

    res.json(report);
  },
  modifyInternshipReportStatus: async (req, res) => {
    const { reportID } = req.params;
    const { status, grade } = req.body;

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

    if (status === "APPROVED") {
      await prisma.internship.update({
        where: {
          internshipID: report.internshipID,
        },
        data: {
          status: "COMPLETED",
        },
      });

      await prisma.final_grade.create({
        data: {
          gradeID: uuid(),
          internshipID: report.internshipID,
          grade,
        },
      });
    }

    res.json(modifiedReport);
  },
};
