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

  public static getInternshipReport = async (internshipID: string) => {
    return appAxios
      .get(`/internship-reports/${internshipID}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static modifyInternshipReportStatus = async (
    reportID: string,
    status: string,
    grade: number
  ) => {
    return appAxios
      .put(`/internship-reports/${reportID}`, {
        status,
        grade,
      })
      .then((res) => res.data)
      .catch((error) => error);
  };
}
