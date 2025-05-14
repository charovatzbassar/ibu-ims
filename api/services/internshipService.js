const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  getInternships: async (req, res) => {
    const companyData =
      req.user.role === "company" &&
      (await prisma.company.findFirst({
        where: {
          contactEmail: req.user.profile.emails[0].value,
        },
      }));

    if (!companyData) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const internships = await prisma.internship.findMany({
      include: {
        company: true,
        intern: true,
        internship_listing: true,
      },
      where: {
        status: "ONGOING",
        ...(req.user.role === "company"
          ? { companyID: companyData.companyID }
          : {}),
      },
    });

    res.json(internships);
  },

  getInternship: async (req, res) => {
    const { internshipID } = req.params;

    const companyData =
      req.user.role === "company" &&
      (await prisma.company.findFirst({
        where: {
          contactEmail: req.user.profile.emails[0].value,
        },
      }));

    if (!companyData) {
      return res.status(400).json({ error: "Company does not exist." });
    }

    const internship = await prisma.internship.findUnique({
      include: {
        company: true,
        intern: true,
        internship_listing: true,
        final_grade: true,
      },
      where: {
        internshipID,
        status: "ONGOING",
        ...(req.user.role === "company"
          ? { companyID: companyData.companyID }
          : {}),
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

    const ongoingInternships = await prisma.internship.findMany({
      include: {
        intern: true,
      },
      where: {
        status: "ONGOING",
        internID: {
          in: interns,
        },
      },
    });

    if (ongoingInternships.length > 0) {
      return res.status(400).json({
        error: "One or more interns already have an ongoing internship.",
        interns: ongoingInternships.map((internship) => internship.intern),
      });
    }

    const newInternships = interns.map((internID) => {
      return {
        internshipID: uuid(),
        companyID: company.companyID,
        listingID,
        internID,
        status: "ONGOING",
      };
    });

    console.log(newInternships);

    // const createdInternships = await prisma.internship.createMany({
    //   data: newInternships,
    // });

    newInternships.forEach(async (internship) => {
      await prisma.internship.create({ data: internship });
    });

    await prisma.internship_listing.update({
      where: {
        listingID,
      },
      data: {
        listingStatus: "INACTIVE",
      },
    });

    res.json(createdInternships);
  },
};
