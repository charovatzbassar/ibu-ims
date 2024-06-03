const prisma = require("../prisma");

module.exports = {
  getInterns: async (req, res) => {
    const { status } = req.query;

    const interns = await prisma.intern.findMany({
      include: {
        internship: {
          include: {
            internship_listing: true,
            company: true,
            internship_report: true,
            internship_day: {
              orderBy: {
                workdayDate: "desc",
              },
            },
          },
        },
      },
      where: {
        internship: {
          ...(status !== "" && { status }),
        },
      },
    });

    res.json(interns);
  },
  getInternsByCompany: async (req, res) => {
    const company = await prisma.company.findFirst({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (!company) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const interns = await prisma.intern.findMany({
      include: {
        internship: {
          include: {
            internship_listing: true,
            internship_report: true,
            internship_day: {
              orderBy: {
                workdayDate: "desc",
              },
            },
            final_grade: true,
          },
        },
      },
      where: {
        internship: {
          companyID: company.companyID,
        },
      },
    });

    res.json(interns);
  },
  getIntern: async (req, res) => {
    const { internID } = req.params;

    const intern = await prisma.intern.findUnique({
      include: {
        internship: {
          include: {
            internship_listing: true,
            company: true,
            internship_report: true,
            internship_day: {
              orderBy: {
                workdayDate: "desc",
              },
            },
            final_grade: true,
          },
        },
      },
      where: {
        internID,
      },
    });

    res.json(intern);
  },
};
