const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.application.createMany({
    data: [
      {
        applicationID: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
        listingID: "41a78b51-98f3-4efb-93b3-b294faff47c0",
        internID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
        applicationStatus: "PENDING",
      },
      {
        applicationID: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        listingID: "c8513b40-8efe-4454-a503-423c6a5df93d",
        internID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
        applicationStatus: "PENDING",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
