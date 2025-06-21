import { expect } from "chai";
import { internshipReportService } from "../services/index.js";

describe("internship reports", () => {
  let createdReportID;
  it("should create a final report for an internship", async () => {
    const req = {
      params: { internshipID: "2f317e2e-6d0f-4fdc-92b0-87937b6e6d15" },
      body: {
        report: "This is a test report",
      },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };

    await internshipReportService.createInternshipReport(req, res);

    createdReportID = jsonResponse.reportID;
    expect(jsonResponse).to.have.property("reportID");
    expect(jsonResponse).to.have.property(
      "internshipID",
      "2f317e2e-6d0f-4fdc-92b0-87937b6e6d15"
    );
  });

  it("should create a final report for a non-existing internship", async () => {
    const req = {
      params: { internshipID: "not-existing" },
      body: {
        report: "This is a test report",
      },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };

    await internshipReportService.createInternshipReport(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property(
      "error",
      "Internship does not exist."
    );
  });

  it("should get an internship report", async () => {
    const req = {
      params: { internshipID: "2f317e2e-6d0f-4fdc-92b0-87937b6e6d15" },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };

    await internshipReportService.getInternshipReport(req, res);
    expect(jsonResponse).to.have.property("reportID", createdReportID);
  });

  it("should get an internship report for non-existing internship", async () => {
    const req = {
      params: { internshipID: "not-existing" },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };

    await internshipReportService.getInternshipReport(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property(
      "error",
      "Internship does not exist."
    );
  });

  it("should modify the internship report status", async () => {
    const req = {
      params: { reportID: createdReportID },
      body: {
        status: "APPROVED",
        grade: 5,
      },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };
    await internshipReportService.modifyInternshipReportStatus(req, res);
    expect(jsonResponse).to.have.property("reportID", createdReportID);
    expect(jsonResponse).to.have.property("status", "APPROVED");
  });

  it("should modify the internship report status for non-existing report", async () => {
    const req = {
      params: { reportID: "not" },
      body: {
        status: "APPROVED",
        grade: 5,
      },
    };

    let jsonResponse;
    const res = {
      json: (response) => {
        jsonResponse = response;
      },
      status: (code) => ({
        json: (response) => {
          jsonResponse = response;
        },
      }),
    };
    await internshipReportService.modifyInternshipReportStatus(req, res);
    expect(jsonResponse).to.be.an("object");
    expect(jsonResponse).to.have.property("error", "Report does not exist.");
  });
});
