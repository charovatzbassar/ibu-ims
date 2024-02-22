const prisma = require("../prisma");

module.exports = {
  getInterns: async (req, res) => {
    const { searchTerm, searchStatus } = req.query;
    const interns = await prisma.intern.findMany({
      include: {
        internship: {
          include: {
            internship_listing: true,
            company: true,
            internship_report: true,
            internship_day: true,
          },
        },
      },
      where: {
        internship: {
          AND: [
            {
              company: {
                companyName: {
                  contains: searchTerm,
                },
              },
            },
            {
              status: searchStatus,
            },
          ],
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
            internship_day: true,
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
