const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  addCompany: async (req, res) => {
    const allCompanies = await prisma.company.findMany();
    res.json(allCompanies);
  },
  createCompany: async (req, res) => {
    const newCompany = await prisma.company.create({
      data: {
        ...req.body,
        status: "ACTIVE",
        companyID: uuid(),
      },
    });
    res.json(newCompany);
  },
  getCompany: async (req, res) => {
    const company = await prisma.company.findUnique({
      where: {
        companyID: req.params.id,
      },
    });

    res.json(company);
  },
  updateCompany: async (req, res) => {
    const updatedCompany = await prisma.company.update({
      where: {
        companyID: req.params.id,
      },
      data: {
        ...req.body,
      },
    });

    res.json(updatedCompany);
  },
  changeCompanyStatus: async (req, res) => {
    const { status } = req.query;
    const { id } = req.params;

    if (status !== "ACTIVE" && status !== "INACTIVE") {
      return res.status(400).json({
        error: "Invalid status. Use 'ACTIVE' or 'INACTIVE'.",
      });
    }

    const updatedCompany = await prisma.company.update({
      where: {
        companyID: id,
      },
      data: {
        status,
      },
    });

    res.json(updatedCompany);
  },
};
