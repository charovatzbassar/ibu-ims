import { expect } from "chai";
import { internsService } from "../services/index.js";

describe("interns", () => {
  it("should return a list of interns", async () => {
    let jsonResponse;

    await internsService.getInterns({
      query: { status: "" },
    }, {
      json: (data) => {
        jsonResponse = data;
      },
    });
    expect(jsonResponse).to.be.an("array");
    expect(jsonResponse.length).to.be.greaterThan(0);
    expect(jsonResponse[0]).to.have.property("internID");
    expect(jsonResponse[0]).to.have.property("firstName");
    expect(jsonResponse[0]).to.have.property("lastName");
    expect(jsonResponse[0]).to.have.property("email");
  });

  it("should return a list of interns by company", async () => {
    let jsonResponse;

    await internsService.getInternsByCompany(
      { user: { profile: { emails: [{ value: "carovac.basar@gmail.com" }] } } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.be.an("array");
  });

  it("should return a list of interns for non-existing company", async () => {
    let jsonResponse;

    await internsService.getInternsByCompany(
      {
        user: {
          profile: { emails: [{ value: "carovac.edrwrwer@gmail.com" }] },
        },
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
        status: (code) => {
          return {
            json: (data) => {
              jsonResponse = data;
            },
          };
        },
      }
    );

    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Company does not exist.");
  });

  it("should get an intern by ID", async () => {
    let jsonResponse;
    await internsService.getIntern(
      { params: { internID: "a7073e3f-6bd7-4e96-9fc0-5a995fd8cbc7" } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("internID");
    expect(jsonResponse).to.have.property("firstName");
    expect(jsonResponse).to.have.property("lastName");
    expect(jsonResponse).to.have.property("email");
  });
});
