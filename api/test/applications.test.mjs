import { expect } from "chai";
import { applicationService } from "../services/index.js";

describe("applications", () => {
  let createdApplicationID;
  it("should get all applications by status", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.basar@gmail.com",
            },
          ],
        },
      },
      params: {
        listingID: "41a78b51-98f3-4efb-93b3-b294faff47c0",
        status: "PENDING",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    applicationService.getApplicationsByStatus(req, res).then(() => {
      expect(jsonResponse).to.be.an("array");
      expect(jsonResponse[0]).to.have.property("applicationID");
      expect(jsonResponse[0]).to.have.property("internship_listing");
      expect(jsonResponse[0]).to.have.property("intern");
      expect(jsonResponse[0].internship_listing).to.have.property("listingID");
      expect(jsonResponse[0].internship_listing).to.have.property("companyID");
      expect(jsonResponse[0].intern).to.have.property("email");
    });
  });
  it("should get all applications by status for non-existing company", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.sadsadsads@gmail.com",
            },
          ],
        },
      },
      params: {
        listingID: "41a78b51-98f3-4efb-93b3-b294faff47c0",
        status: "PENDING",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    applicationService.getApplicationsByStatus(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property("error", "Company does not exist.");
    });
  });
  it("should get all applications by status for non-existing internship listing", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.basar@gmail.com",
            },
          ],
        },
      },
      params: {
        listingID: "non-existing-listing-id",
        status: "PENDING",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    applicationService.getApplicationsByStatus(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property(
        "error",
        "Internship listing does not exist."
      );
    });
  });
  it("should get all applications for an intern", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "basar.carovac@stu.ibu.edu.ba",
            },
          ],
        },
      },
      query: {
        status: "PENDING",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    applicationService.getApplicationsForIntern(req, res).then(() => {
      expect(jsonResponse).to.be.an("array");
      expect(jsonResponse[0]).to.have.property("applicationID");
      expect(jsonResponse[0]).to.have.property("internship_listing");
      expect(jsonResponse[0]).to.have.property("intern");
      expect(jsonResponse[0].internship_listing).to.have.property("listingID");
      expect(jsonResponse[0].internship_listing).to.have.property("companyID");
      expect(jsonResponse[0].intern).to.have.property("email");
    });
  });
  it("should get all applications for a non-existing intern", () => {});
  const req = {
    user: {
      profile: {
        emails: [
          {
            value: "non-existing",
          },
        ],
      },
    },
    query: {
      status: "PENDING",
    },
  };

  let jsonResponse;

  const res = {
    json: (response) => {
      jsonResponse = response;
    },
    status: (code) => {
      return {
        json: (response) => {
          jsonResponse = response;
        },
      };
    },
  };

  applicationService.getApplicationsForIntern(req, res).then(() => {
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Intern does not exist.");
  });
  it("should modify the application's status", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.basar@gmail.com",
            },
          ],
        },
      },
      params: {
        applicationID: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
      },
      body: {
        status: "APPROVED",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.modifyApplicationStatus(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse.applicationStatus).to.be.equal("APPROVED");
      expect(jsonResponse).to.have.property("applicationID");
    });
  });
  it("should modify the application's status for a non-existing company", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "carovac.sadsadsad@gmail.com",
            },
          ],
        },
      },
      params: {
        applicationID: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
      },
      body: {
        status: "APPROVED",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    applicationService.modifyApplicationStatus(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property("error", "Company does not exist.");
    });
  });
  it("should create an application", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "sam@stu.ibu.edu.ba",
            },
          ],
        },
      },
      body: {
        listingID: "f299b843-1dd8-4f54-a746-bcdfec2a4e23",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.createApplication(req, res).then(() => {
      createdApplicationID = jsonResponse.applicationID;
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property("applicationID");
      expect(jsonResponse).to.have.property("listingID");
      expect(jsonResponse).to.have.property("internID");
      expect(jsonResponse).to.have.property("applicationStatus", "PENDING");
    });
  });
  it("should create an application for non-existing intern", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "basar.sadsadsad@stu.ibu.edu.ba",
            },
          ],
        },
      },
      body: {
        listingID: "f299b843-1dd8-4f54-a746-bcdfec2a4e23",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.createApplication(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property("error", "Intern does not exist.");
    });
  });
  it("should create an application for non-existing internship listing", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "sam@stu.ibu.edu.ba",
            },
          ],
        },
      },
      body: {
        listingID: "doisajdoiajsd",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.createApplication(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property(
        "error",
        "Internship listing does not exist."
      );
    });
  });
  it("should create an application for previously applied internship listing", () => {
    const req = {
      user: {
        profile: {
          emails: [
            {
              value: "sam@stu.ibu.edu.ba",
            },
          ],
        },
      },
      body: {
        listingID: "f299b843-1dd8-4f54-a746-bcdfec2a4e23",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.createApplication(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property(
        "error",
        "You have already applied for this listing."
      );
    });
  });
  it("should create an application if there is an ongoing internship", () => {
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
      body: {
        listingID: "1712848e-f6bf-4509-83a9-cbfa364d6b87",
      },
    };

    let jsonResponse;

    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => {
        return {
          json: (response) => {
            jsonResponse = response;
          },
        };
      },
    };

    return applicationService.createApplication(req, res).then(() => {
      expect(jsonResponse).to.be.an("object");
      expect(jsonResponse).to.have.property(
        "error",
        "You already have an ongoing internship."
      );
    });
  });
});
