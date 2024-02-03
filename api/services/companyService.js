const prisma = require("../prisma");

module.exports = {
  addCompany: async (req, res) => {
    const allCompanies = await prisma.company.findMany();
    res.json(allCompanies);
  },
  createCompany: async (req, res) => {
    const newCompany = await prisma.company.create({
      data: {
        ...req.body,
      },
    });
    res.json(newCompany);
  },
  getCompany: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        companyID: Number(req.params.id),
      },
    });

    res.json(company);
  },
  updateCompany: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        contactEmail: req.user.profile.emails[0].value,
      },
    });

    if (company.companyID !== Number(req.params.id)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedCompany = await prisma.company.update({
      where: {
        companyID: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    res.json(updatedCompany);
  },
  deleteCompany: async (req, res) => {
    const deletedCompany = await prisma.company.delete({
      where: {
        companyID: Number(req.params.id),
      },
    });

    res.json(deletedCompany);
  },
};
