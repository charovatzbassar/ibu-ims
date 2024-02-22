import appAxios from "./appAxios";

export default class InternshipReportsService {
  public static createInternshipReport = async (
    internshipID: string,
    report: string
  ) => {
    return appAxios
      .post(`/internship-reports/${internshipID}`, { report })
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getInternshipReport = async (
    internshipID: string,
    internID: string
  ) => {
    return appAxios
      .get(`/internship-reports/${internshipID}/${internID}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static modifyInternshipReportStatus = async (
    reportID: string,
    status: string
  ) => {
    return appAxios
      .put(`/internship-reports/${reportID}`, {
        status,
      })
      .then((res) => res.data)
      .catch((error) => error);
  };
}
