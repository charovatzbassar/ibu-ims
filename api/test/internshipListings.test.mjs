import { expect } from "chai";
import { internshipListingService } from "../services/index.js";

describe("internship listings", () => {
  let createdListingID;
  it("should return internship listings", () => {
    const fakeReq = {
      query: {
        searchTerm: "",
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListings(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("array");
        expect(jsonResponse.length).to.be.greaterThan(0);
        jsonResponse.forEach((listing) => {
          expect(listing).to.have.property("listingID");
          expect(listing).to.have.property("companyID");
          expect(listing).to.have.property("position");
          expect(listing).to.have.property("location");
          expect(listing).to.have.property("listingDescription");
          expect(listing).to.have.property("startDate");
          expect(listing).to.have.property("endDate");
          expect(listing).to.have.property("listingStatus");
          expect(listing).to.have.property("requirements");
          expect(listing).to.have.property("noOfPlaces");
        });
      });
  });

  it("should get internship listings with search term", () => {
    const fakeReq = {
      query: {
        searchTerm: "Web Designer",
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListings(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("array");

        jsonResponse.forEach((listing) => {
          expect(listing.position).to.include("Web Designer");
        });
      });
  });

  it("should get internship listing by ID", () => {
    const fakeReq = {
      params: {
        id: "00c85870-d7b3-4e74-9100-b7bf02b7c906",
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "listingID",
          "00c85870-d7b3-4e74-9100-b7bf02b7c906"
        );
      });
  });

  it("should get internship listings by non-existing ID", () => {
    const fakeReq = {
      params: {
        id: "nothing-here",
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.null;
      });
  });

  it("should get internship listings by company email", () => {
    const fakeReq = {
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListingsByCompany(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("array");
        jsonResponse.forEach((listing) => {
          expect(listing).to.have.property("company");
          expect(listing.company).to.have.property("companyID");
        });
      });
  });

  it("should get internship listings by non-existing company email", () => {
    const fakeReq = {
      user: {
        profile: {
          emails: [{ value: "carovac.sdadsdas@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .getInternshipListingsByCompany(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("array").that.is.empty;
      });
  });

  it("should create internship listing", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2026-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .createInternshipListing(fakeReq, fakeRes)
      .then(() => {
        createdListingID = jsonResponse.listingID;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property("listingID");
        expect(jsonResponse.position).to.equal("Software Engineer");
        expect(jsonResponse.location).to.equal("Remote");
        expect(jsonResponse.listingDescription).to.equal(
          "Developing software solutions."
        );
        expect(jsonResponse.startDate.toISOString()).to.equal(
          "2026-10-01T00:00:00.000Z"
        );
        expect(jsonResponse.endDate.toISOString()).to.equal(
          "2026-12-01T00:00:00.000Z"
        );
        expect(jsonResponse.requirements).to.equal("JavaScript, Node.js");
        expect(jsonResponse.noOfPlaces).to.equal(2);
      });
  });
  it("should update internship listing", () => {
    const fakeReq = {
      params: {
        id: createdListingID,
      },
      body: {
        position: "Updated Position",
        location: "Updated Location",
        listingDescription: "Updated Description",
        startDate: "2027-10-01T00:00:00.000Z",
        endDate: "2027-12-01T00:00:00.000Z",
        requirements: "Updated Requirements",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
      json: (data) => {
        jsonResponse = data;
      },
    };

    return internshipListingService
      .updateInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property("listingID", createdListingID);
        expect(jsonResponse.position).to.equal("Updated Position");
        expect(jsonResponse.location).to.equal("Updated Location");
        expect(jsonResponse.listingDescription).to.equal("Updated Description");
        expect(jsonResponse.startDate.toISOString()).to.equal(
          "2027-10-01T00:00:00.000Z"
        );
        expect(jsonResponse.endDate.toISOString()).to.equal(
          "2027-12-01T00:00:00.000Z"
        );
        expect(jsonResponse.requirements).to.equal("Updated Requirements");
        expect(jsonResponse.noOfPlaces).to.equal(2);
      });
  });

  it("should update internship listing for non-existing company", () => {
    const fakeReq = {
      params: {
        id: createdListingID,
      },
      body: {
        position: "Updated Position",
        location: "Updated Location",
        listingDescription: "Updated Description",
        startDate: "2027-10-01T00:00:00.000Z",
        endDate: "2027-12-01T00:00:00.000Z",
        requirements: "Updated Requirements",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.dsadsad@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .updateInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Company does not exist."
        );
      });
  });

  it("should throw error where start date is not in the future when updated", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2022-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .updateInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Start date must be in the future."
        );
      });
  });

  it("should throw error where start date is after the end date when updated", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2027-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .updateInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Start date must be before end date."
        );
      });
  });

  it("should delete internship listing", () => {
    const fakeReq = {
      params: {
        id: createdListingID,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .deleteInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property("listingID", createdListingID);
        expect(jsonResponse.position).to.equal("Updated Position");
        expect(jsonResponse.location).to.equal("Updated Location");
        expect(jsonResponse.listingDescription).to.equal("Updated Description");
        expect(jsonResponse.startDate.toISOString()).to.equal(
          "2027-10-01T00:00:00.000Z"
        );
        expect(jsonResponse.endDate.toISOString()).to.equal(
          "2027-12-01T00:00:00.000Z"
        );
        expect(jsonResponse.requirements).to.equal("Updated Requirements");
        expect(jsonResponse.noOfPlaces).to.equal(2);
      });
  });

  it("should create internship listing for non-existing company", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2026-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.dsadsadsad@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .createInternshipListing(fakeReq, fakeRes)
      .then(() => {
        createdListingID = jsonResponse.listingID;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Company does not exist."
        );
      });
  });

  it("should throw error where start date is not in the future", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2022-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .createInternshipListing(fakeReq, fakeRes)
      .then(() => {
        createdListingID = jsonResponse.listingID;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Start date must be in the future."
        );
      });
  });

  it("should throw error where start date is after the end date", () => {
    const fakeReq = {
      body: {
        position: "Software Engineer",
        location: "Remote",
        listingDescription: "Developing software solutions.",
        startDate: "2027-10-01",
        endDate: "2026-12-01",
        requirements: "JavaScript, Node.js",
        noOfPlaces: 2,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.basar@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .createInternshipListing(fakeReq, fakeRes)
      .then(() => {
        createdListingID = jsonResponse.listingID;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Start date must be before end date."
        );
      });
  });

  it("should delete internship listing for non-existing company", () => {
    const fakeReq = {
      params: {
        id: createdListingID,
      },
      user: {
        profile: {
          emails: [{ value: "carovac.dfsfdsfdsfsfd@gmail.com" }],
        },
      },
    };
    let jsonResponse;
    const fakeRes = {
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
    };

    return internshipListingService
      .deleteInternshipListing(fakeReq, fakeRes)
      .then(() => {
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "error",
          "Company does not exist."
        );
      });
  });
});
