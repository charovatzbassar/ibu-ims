const express = require("express");
const prisma = require("../prisma/prisma");
const { catchAsync } = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/isLoggedIn");
const { checkRole } = require("../utils/checkRole");

const router = express.Router();

router.use(isLoggedIn);

router
  .route("/")
  .get(
    catchAsync(async (req, res) => {
      const allCompanies = await prisma.company.findMany();
      res.json(allCompanies);
    })
  )
  .post(
    catchAsync(async (req, res) => {
      const newCompany = await prisma.company.create({
        data: {
          ...req.body,
        },
      });
      res.json(newCompany);
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req, res) => {
      const company = await prisma.company.findUnique({
        where: {
          companyID: Number(req.params.id),
        },
      });

      res.json(company);
    })
  )
  .patch(
    checkRole("company"),
    catchAsync(async (req, res) => {
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
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const deletedCompany = await prisma.company.delete({
        where: {
          companyID: Number(req.params.id),
        },
      });

      res.json(deletedCompany);
    })
  );

module.exports = router;
