import { expect } from "chai";
import { managerService } from "../services/index.js";

describe("managers", () => {
  let newManagerID;
  it("should return a list of managers", async () => {
    let jsonResponse;

    await managerService.addManager(null, {
      json: (data) => {
        jsonResponse = data;
      },
    });
    expect(jsonResponse).to.be.an("array");
    expect(jsonResponse.length).to.be.greaterThan(0);
    expect(jsonResponse[0]).to.have.property("managerID");
    expect(jsonResponse[0]).to.have.property("firstName");
    expect(jsonResponse[0]).to.have.property("lastName");
    expect(jsonResponse[0]).to.have.property("email");
    expect(jsonResponse[0]).to.have.property("status");
  });

  it("should create a new manager", async () => {
    const newCompany = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    };
    let jsonResponse;
    await managerService.createManager(
      {
        body: newCompany,
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    newManagerID = jsonResponse.managerID;

    expect(jsonResponse).to.have.property("managerID");
    expect(jsonResponse.firstName).to.equal(newCompany.firstName);
    expect(jsonResponse.lastName).to.equal(newCompany.lastName);
    expect(jsonResponse.email).to.equal(newCompany.email);
    expect(jsonResponse.status).to.equal("INACTIVE");
  });

  it("should get a manager by ID", async () => {
    let jsonResponse;
    await managerService.getManager(
      { params: { id: newManagerID } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("managerID", newManagerID);
    expect(jsonResponse).to.have.property("firstName");
    expect(jsonResponse).to.have.property("lastName");
    expect(jsonResponse).to.have.property("email");
    expect(jsonResponse.status).to.equal("INACTIVE");
  });

  it("should update a manager", async () => {
    const updatedManager = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
    };

    let jsonResponse;
    await managerService.updateManager(
      { params: { id: newManagerID }, body: updatedManager },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );
    expect(jsonResponse).to.have.property("managerID", newManagerID);
    expect(jsonResponse.firstName).to.equal(updatedManager.firstName);
    expect(jsonResponse.lastName).to.equal(updatedManager.lastName);
    expect(jsonResponse.email).to.equal(updatedManager.email);
    expect(jsonResponse.status).to.equal("INACTIVE");
  });

  it("should change manager status", async () => {
    let jsonResponse;
    await managerService.changeManagerStatus(
      { params: { id: newManagerID } },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );

    expect(jsonResponse).to.have.property("managerID", newManagerID);
    expect(jsonResponse.status).to.equal("ACTIVE");
  });
});
