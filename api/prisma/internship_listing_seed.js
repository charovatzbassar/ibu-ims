const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.internship_listing.createMany({
    data: [
      {
        listingID: "f68dade3-2a31-4525-8d10-3d79aa3af79c",
        position: "Senior Cost Accountant",
        location: "Minh Lương",
        listingDescription:
          "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        startDate: new Date("2026-11-24"),
        endDate: new Date("2026-12-20"),
        listingStatus: "ACTIVE",
        requirements:
          "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        noOfPlaces: 5,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "6df8ca70-4326-4843-84ad-8ebd211785ab",
        position: "Engineer I",
        location: "Makurdi",
        listingDescription:
          "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        startDate: new Date("2026-10-11"),
        endDate: new Date("2026-10-20"),
        listingStatus: "INACTIVE",
        requirements:
          "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        noOfPlaces: 6,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "f175f954-5e4a-4436-9c30-032184637eb9",
        position: "Human Resources Manager",
        location: "Yuetang",
        listingDescription:
          "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        startDate: new Date("2026-12-05"),
        endDate: new Date("2026-11-24"),
        listingStatus: "INACTIVE",
        requirements:
          "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        noOfPlaces: 10,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "95f65001-e881-4213-b111-973215461e10",
        position: "Quality Engineer",
        location: "Hullo",
        listingDescription:
          "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        startDate: new Date("2026-10-25"),
        endDate: new Date("2026-10-15"),
        listingStatus: "INACTIVE",
        requirements:
          "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        noOfPlaces: 6,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "c8513b40-8efe-4454-a503-423c6a5df93d",
        position: "Safety Technician IV",
        location: "Enköping",
        listingDescription:
          "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        startDate: new Date("2026-12-18"),
        endDate: new Date("2026-12-17"),
        listingStatus: "INACTIVE",
        requirements:
          "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        noOfPlaces: 3,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "41a78b51-98f3-4efb-93b3-b294faff47c0",
        position: "Chief Design Engineer",
        location: "Kostyantynivka",
        listingDescription:
          "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        startDate: new Date("2026-11-21"),
        endDate: new Date("2026-12-15"),
        listingStatus: "ACTIVE",
        requirements:
          "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        noOfPlaces: 7,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "d54e53c5-de1c-4e86-b9ab-068995f7daef",
        position: "Biostatistician II",
        location: "Hidalgo",
        listingDescription:
          "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
        startDate: new Date("2026-10-28"),
        endDate: new Date("2026-10-28"),
        listingStatus: "ACTIVE",
        requirements:
          "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        noOfPlaces: 3,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "aadc69a4-d693-442e-8627-a426be6c37a7",
        position: "Legal Assistant",
        location: "Josefův Důl",
        listingDescription:
          "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        startDate: new Date("2026-11-24"),
        endDate: new Date("2026-12-16"),
        listingStatus: "ACTIVE",
        requirements:
          "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
        noOfPlaces: 3,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "5fef61c2-eb44-4a0b-8b39-f669b9d98f03",
        position: "Environmental Tech",
        location: "Huazhu",
        listingDescription:
          "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        startDate: new Date("2026-12-28"),
        endDate: new Date("2026-11-27"),
        listingStatus: "INACTIVE",
        requirements:
          "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        noOfPlaces: 3,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "ad904111-6ff6-4573-939b-15e96ef1ab8f",
        position: "Senior Cost Accountant",
        location: "Suqiaoxiang",
        listingDescription:
          "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        startDate: new Date("2026-10-09"),
        endDate: new Date("2026-10-20"),
        listingStatus: "INACTIVE",
        requirements:
          "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        noOfPlaces: 3,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "890a3cbe-cbd3-4093-a4ef-d322733ec5a1",
        position: "Staff Scientist",
        location: "Youfang",
        listingDescription:
          "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
        startDate: new Date("2026-10-05"),
        endDate: new Date("2026-12-15"),
        listingStatus: "ACTIVE",
        requirements:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
        noOfPlaces: 9,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "2a3ff8a0-75a5-49f5-a3f4-19ee2aea9b03",
        position: "VP Marketing",
        location: "Černovice",
        listingDescription:
          "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        startDate: new Date("2026-11-11"),
        endDate: new Date("2026-11-22"),
        listingStatus: "INACTIVE",
        requirements:
          "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        noOfPlaces: 5,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "00c85870-d7b3-4e74-9100-b7bf02b7c906",
        position: "VP Marketing",
        location: "Balkh",
        listingDescription:
          "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
        startDate: new Date("2026-12-15"),
        endDate: new Date("2026-12-07"),
        listingStatus: "ACTIVE",
        requirements:
          "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        noOfPlaces: 7,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "f299b843-1dd8-4f54-a746-bcdfec2a4e23",
        position: "Administrative Assistant II",
        location: "Binuangeun",
        listingDescription:
          "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
        startDate: new Date("2026-10-19"),
        endDate: new Date("2026-10-29"),
        listingStatus: "ACTIVE",
        requirements:
          "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        noOfPlaces: 7,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "1712848e-f6bf-4509-83a9-cbfa364d6b87",
        position: "VP Sales",
        location: "Castellon De La Plana/Castello De La Pla",
        listingDescription:
          "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        startDate: new Date("2026-10-07"),
        endDate: new Date("2026-12-08"),
        listingStatus: "ACTIVE",
        requirements:
          "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
        noOfPlaces: 8,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "76bf4908-9120-4e11-8860-cc8eab211dfe",
        position: "Nurse Practicioner",
        location: "Peranap",
        listingDescription:
          "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
        startDate: new Date("2026-10-13"),
        endDate: new Date("2026-12-02"),
        listingStatus: "ACTIVE",
        requirements:
          "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        noOfPlaces: 7,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "6d5070f0-905c-4b63-83d6-b0e9a4653914",
        position: "Data Coordinator",
        location: "Tinambac",
        listingDescription:
          "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        startDate: new Date("2026-12-04"),
        endDate: new Date("2026-12-22"),
        listingStatus: "INACTIVE",
        requirements:
          "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        noOfPlaces: 5,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "ed2faa13-d705-4aad-a8a3-afa16a9da1d4",
        position: "Financial Analyst",
        location: "Álftanes",
        listingDescription:
          "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        startDate: new Date("2026-10-16"),
        endDate: new Date("2026-11-13"),
        listingStatus: "INACTIVE",
        requirements:
          "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        noOfPlaces: 1,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "59f8dff2-aa8b-45f7-9b80-86cec2c2a25a",
        position: "Web Designer II",
        location: "Tiguion",
        listingDescription:
          "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
        startDate: new Date("2026-11-23"),
        endDate: new Date("2026-11-08"),
        listingStatus: "INACTIVE",
        requirements:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
        noOfPlaces: 4,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
      },
      {
        listingID: "01c3427e-a2e8-468c-9f7b-a25eb41167cc",
        position: "Sales Representative",
        location: "Salto",
        listingDescription:
          "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        startDate: new Date("2026-10-27"),
        endDate: new Date("2026-12-13"),
        listingStatus: "INACTIVE",
        requirements:
          "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        noOfPlaces: 5,
        companyID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc5",
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
