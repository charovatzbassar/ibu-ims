import { expect } from "chai";
import { companyService } from "../services/index.js";

describe("companies", () => {
  let newCompanyID;
  it("should return a list of companies", async () => {
    let jsonResponse;

    await companyService.addCompany(null, {
      json: (data) => {
        jsonResponse = data;
      },
    });
    expect(jsonResponse).to.be.an("array");
    expect(jsonResponse.length).to.be.greaterThan(0);
    expect(jsonResponse[0]).to.have.property("companyID");
    expect(jsonResponse[0]).to.have.property("location");
    expect(jsonResponse[0]).to.have.property("companyName");
    expect(jsonResponse[0]).to.have.property("contactEmail");
    expect(jsonResponse[0]).to.have.property("status");
  });

  it("should create a new company", async () => {
    const newCompany = {
      companyName: "Test Company",
      location: "Test Location",
      contactEmail: "test@gmail.com",
    };
    let jsonResponse;
    await companyService.createCompany(
      {
        body: newCompany,
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    newCompanyID = jsonResponse.companyID;

    expect(jsonResponse).to.have.property("companyID");
    expect(jsonResponse.companyName).to.equal(newCompany.companyName);
    expect(jsonResponse.location).to.equal(newCompany.location);
    expect(jsonResponse.contactEmail).to.equal(newCompany.contactEmail);
    expect(jsonResponse.status).to.equal("ACTIVE");
  });

  it("should get a company by ID", async () => {
    let jsonResponse;
    await companyService.getCompany(
      { params: { id: newCompanyID } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("companyID", newCompanyID);
    expect(jsonResponse).to.have.property("companyName");
    expect(jsonResponse).to.have.property("location");
    expect(jsonResponse).to.have.property("contactEmail");
    expect(jsonResponse).to.have.property("status");
  });

  it("should update a company", async () => {
    const updatedCompany = {
      companyName: "Updated Company",
      location: "Updated Location",
      contactEmail: "updated@gmail.com",
    };
    let jsonResponse;
    await companyService.updateCompany(
      { params: { id: newCompanyID }, body: updatedCompany },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("companyID", newCompanyID);
    expect(jsonResponse.companyName).to.equal(updatedCompany.companyName);
    expect(jsonResponse.location).to.equal(updatedCompany.location);
    expect(jsonResponse.contactEmail).to.equal(updatedCompany.contactEmail);
    expect(jsonResponse.status).to.equal("ACTIVE");
  });

  it("should change company status to INACTIVE", async () => {
    let jsonResponse;
    await companyService.changeCompanyStatus(
      { params: { id: newCompanyID }, query: { status: "INACTIVE" } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("companyID", newCompanyID);
    expect(jsonResponse.status).to.equal("INACTIVE");
  });

  it("should change company status to invalid status", async () => {
    let jsonResponse;
    await companyService.changeCompanyStatus(
      { params: { id: newCompanyID }, query: { status: "INVALID" } },
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

    expect(jsonResponse).to.have.property(
      "error",
      "Invalid status. Use 'ACTIVE' or 'INACTIVE'."
    );
  });
});
