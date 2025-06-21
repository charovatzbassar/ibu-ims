import { expect } from "chai";
import { internshipService } from "../services/index.js";

describe("internships", () => {
  it("should get all ongoing internships for a company", async () => {
    const req = {
      user: {
        role: "company",
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = { code, data };
        },
      }),
    };

    await internshipService.getInternships(req, res);

    expect(jsonResponse).to.be.an("array");
  });

  it("should get all ongoing internships for a non-existing company", async () => {
    const req = {
      user: {
        role: "company",
        profile: {
          emails: [{ value: "carovac.dshifdsf@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.getInternships(req, res);

    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Company does not exist.");
  });

  it("should get a specific ongoing internship for a company", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
      user: {
        role: "company",
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.getInternship(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property(
      "internshipID",
      "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495"
    );
    expect(jsonResponse).to.have.property("status", "ONGOING");
  });

  it("should get a specific ongoing internship for a non-existing company", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
      user: {
        role: "company",
        profile: {
          emails: [{ value: "carovac.sadsadsad@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.getInternship(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Company does not exist.");
  });

  it("should get an ongoing internship for an intern", async () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "testintern@stu.ibu.edu.ba",
            },
          ],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.getInternshipByIntern(req, res);

    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("intern");
    expect(jsonResponse).to.have.property("internshipID");
  });

  it("should get an ongoing internship for a non-existing intern", async () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.dasdasdsads@gmail.com",
            },
          ],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.getInternshipByIntern(req, res);

    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Intern does not exist.");
  });

  it("should create a new internship", async () => {
    const req = {
      body: {
        interns: ["a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc6"],

        listingID: "76bf4908-9120-4e11-8860-cc8eab211dfe",
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.createInternship(req, res);

    console.log(jsonResponse);
    

    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("success", true);
  });

  it("should create a new internship for non-existing company", async () => {
    const req = {
      body: {
        interns: ["a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc6"],

        listingID: "76bf4908-9120-4e11-8860-cc8eab211dfe",
      },
      user: {
        profile: {
          emails: [{ value: "carovac.dsahiufdhsf@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.createInternship(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Company does not exist.");
  });

  it("should create a new internship for non-existing internship listing", async () => {
    const req = {
      body: {
        interns: ["a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc6"],
        listingID: "non-existing-listing-id",
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.createInternship(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property(
      "error",
      "Listing does not exist."
    );
  });

  it("should create a new internship for intern with existing internship", async () => {
    const req = {
      body: {
        interns: [
          "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc7",
          "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc6",
        ],
        listingID: "non-existing-listing-id",
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
      },
      status: (code) => ({
        json: (data) => {
          jsonResponse = data;
        },
      }),
    };

    await internshipService.createInternship(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property(
      "error",
      "Listing does not exist."
    );
  });
});
