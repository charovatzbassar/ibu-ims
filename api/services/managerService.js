const prisma = require("../prisma");
const { v4: uuid } = require("uuid");

module.exports = {
  addManager: async (req, res) => {
    const allManagers = await prisma.manager.findMany();
    res.json(allManagers);
  },
  createManager: async (req, res) => {
    const newManager = await prisma.manager.create({
      data: {
        ...req.body,
        status: "INACTIVE",
        managerID: uuid(),
      },
    });
    res.json(newManager);
  },
  getManager: async (req, res) => {
    const manager = await prisma.manager.findUnique({
      where: {
        managerID: req.params.id,
      },
    });

    res.json(manager);
  },
  updateManager: async (req, res) => {
    const updatedManager = await prisma.manager.update({
      where: {
        managerID: req.params.id,
      },
      data: {
        ...req.body,
      },
    });

    res.json(updatedManager);
  },

  changeManagerStatus: async (req, res) => {
    const activeManager = await prisma.manager.findFirst({
      where: {
        status: "ACTIVE",
      },
    });
    

    await prisma.manager.update({
      where: {
        managerID: activeManager.managerID,
      },
      data: {
        status: "INACTIVE",
      },
    });

    const updatedManager = await prisma.manager.update({
      where: {
        managerID: req.params.id,
      },
      data: {
        status: "ACTIVE",
      },
    });

    res.json(updatedManager);
  },
};
