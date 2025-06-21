import { expect } from "chai";
import { internshipDayService } from "../services/index.js";

describe("internship days", () => {
  let newInternshipDayID;

  it("should return a list of internship days", async () => {
    let jsonResponse;

    await internshipDayService.getInternshipDays(
      {
        params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
        user: {
          profile: {
            emails: [{ value: "carovac.basar@gmail.com" }],
          },
        },
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );
    expect(jsonResponse).to.be.an("array");
  });

  it("should return a list of internship days for non-existing company", async () => {
    let jsonResponse;

    await internshipDayService.getInternshipDays(
      {
        params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
        user: {
          profile: {
            emails: [{ value: "carovac.basar@sadsadsa.com" }],
          },
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
    expect(jsonResponse).to.have.property("message", "Unauthorized");
  });

  it("should return all of internship days for an internship", async () => {
    let jsonResponse;

    await internshipDayService.getAllInternshipDays(
      {
        params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
        user: {
          profile: {
            emails: [{ value: "carovac.basar@gmail.com" }],
          },
        },
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );
    expect(jsonResponse).to.be.an("array");
  });

  it("should return all of internship days for an internship by date", async () => {
    let jsonResponse;

    await internshipDayService.getInternshipDaysByDate(
      {
        params: {
          internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495",
          date: "2023-10-01",
        },
      },
      {
        json: (data) => {
          jsonResponse = data;
        },
      }
    );
    expect(jsonResponse).to.be.an("array");
  });

  it("should create a new internship day", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
      body: {
        description: "Test internship day",
      },
      user: {
        profile: {
          emails: [{ value: "testintern@stu.ibu.edu.ba" }],
        },
      },
    };

    const res = {
      json: (data) => {
        newInternshipDayID = data.dayID;
        expect(data).to.have.property("dayID");
        expect(data).to.have.property("workdayDate");
        expect(data).to.have.property("dayDescription");
        expect(data).to.have.property("status", "PENDING");
      },
    };

    await internshipDayService.createInternshipDay(req, res);
  });

  it("should create a new internship day for non-existing internship", async () => {
    const req = {
      params: { internshipID: "non-existing" },
      body: {
        description: "Test internship day",
      },
      user: {
        profile: {
          emails: [{ value: "testintern@stu.ibu.edu.ba" }],
        },
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.have.property("message", "Internship does not exist.");
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).to.have.property(
              "message",
              "Internship does not exist."
            );
          },
        };
      },
    };

    await internshipDayService.createInternshipDay(req, res);
  });

  it("should create a new internship day for not started internship", async () => {
    const req = {
      params: { internshipID: "2f317e2e-6d0f-4fdc-92b0-87937b6e6d16" },
      body: {
        description: "Test internship day",
      },
      user: {
        profile: {
          emails: [{ value: "someone@stu.ibu.edu.ba" }],
        },
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.have.property(
          "message",
          "Your internship has not started yet."
        );
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).to.have.property(
              "message",
              "Your internship has not started yet."
            );
          },
        };
      },
    };

    await internshipDayService.createInternshipDay(req, res);
  });

  it("should create a new internship day for ended internship", async () => {
    const req = {
      params: { internshipID: "2f317e2e-6d0f-4fdc-92b0-87937b6e6d15" },
      body: {
        description: "Test internship day",
      },
      user: {
        profile: {
          emails: [{ value: "basar.carovac@stu.ibu.edu.ba" }],
        },
      },
    };

    const res = {
      json: (data) => {
        expect(data).to.have.property("message", "Your internship has ended.");
      },
      status: (code) => {
        return {
          json: (data) => {
            expect(data).to.have.property(
              "message",
              "Your internship has ended."
            );
          },
        };
      },
    };

    await internshipDayService.createInternshipDay(req, res);
  });

  it("should modify internship day status", async () => {
    const req = {
      params: {
        dayID: newInternshipDayID,
      },
      body: {
        status: "APPROVED",
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
        expect(jsonResponse).to.have.property("dayID", newInternshipDayID);
        expect(jsonResponse).to.have.property("status", "APPROVED");
      },
    };

    await internshipDayService.modifyInternshipDayStatus(req, res);
  });

  it("should modify internship day status for non-existing company", async () => {
    const req = {
      params: {
        dayID: newInternshipDayID,
      },
      body: {
        status: "APPROVED",
      },
      user: {
        profile: {
          emails: [{ value: "carovac.dasdsadsad@gmail.com" }],
        },
      },
    };

    let jsonResponse;

    const res = {
      json: (data) => {
        jsonResponse = data;
        expect(jsonResponse).to.have.property(
          "message",
          "Company does not exist."
        );
      },
      status: (code) => {
        return {
          json: (data) => {
            jsonResponse = data;
            expect(jsonResponse).to.have.property(
              "message",
              "Company does not exist."
            );
          },
        };
      },
    };

    await internshipDayService.modifyInternshipDayStatus(req, res);
  });

  it("should modify internship day status for non-existing day", async () => {
    const req = {
      params: {
        dayID: "non-existing-day-id",
      },
      body: {
        status: "APPROVED",
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
        expect(jsonResponse).to.have.property("message", "Day does not exist.");
      },
      status: (code) => {
        return {
          json: (data) => {
            jsonResponse = data;
            expect(jsonResponse).to.have.property(
              "message",
              "Day does not exist."
            );
          },
        };
      },
    };

    await internshipDayService.modifyInternshipDayStatus(req, res);
  });

  it("should approve all internship days", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
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
        expect(jsonResponse).to.be.an("object");
      },
    };

    await internshipDayService.approveAllInternshipDays(req, res);
  });

  it("should approve all internship days for non-existing company", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
      user: {
        profile: {
          emails: [{ value: "carovac.dksfojdsf@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "message",
          "Company does not exist."
        );
      },
      status: (code) => {
        return {
          json: (data) => {
            jsonResponse = data;
            expect(jsonResponse).to.have.property(
              "message",
              "Company does not exist."
            );
          },
        };
      },
    };

    await internshipDayService.approveAllInternshipDays(req, res);
  });

  it("should approve all internship days for non-existing internship", async () => {
    const req = {
      params: { internshipID: "0ca9c81b-c92c-4eb5-8b99-a83ff95c0495" },
      user: {
        profile: {
          emails: [{ value: "carovac.dksfojdsf@gmail.com" }],
        },
      },
    };

    let jsonResponse;
    const res = {
      json: (data) => {
        jsonResponse = data;
        expect(jsonResponse).to.be.an("object");
        expect(jsonResponse).to.have.property(
          "message",
          "Company does not exist."
        );
      },
      status: (code) => {
        return {
          json: (data) => {
            jsonResponse = data;
            expect(jsonResponse).to.have.property(
              "message",
              "Company does not exist."
            );
          },
        };
      },
    };

    await internshipDayService.approveAllInternshipDays(req, res);
  });
});
