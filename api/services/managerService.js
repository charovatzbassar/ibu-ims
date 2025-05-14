const prisma = require("../prisma");

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
    console.log("Here");

    const updatedManager = await prisma.manager.update({
      where: {
        managerID: req.params.id,
      },
      data: {
        status: "ACTIVE",
      },
    });
    console.log(updatedManager);

    res.json(updatedManager);
  },
};
