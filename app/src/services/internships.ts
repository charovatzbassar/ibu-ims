import appAxios from "./appAxios";

export default class InternshipsService {
  public static getInternships = async () => {
    return appAxios.get("/internships").then((res) => res.data);
  };
  public static getInternship = async (internshipID: string) => {
    return appAxios.get(`/internships/${internshipID}`).then((res) => res.data);
  };
  public static createInternship = async (
    listingID: string,
    companyID: string,
    interns: string[]
  ) => {
    return appAxios
      .post("/internships", { listingID, companyID, interns })
      .then((res) => res.data);
  };
  public static createInternshipFinalReport = async (
    internshipID: string,
    finalReport: string
  ) => {
    return appAxios
      .put(`/internships/${internshipID}`, { finalReport })
      .then((res) => res.data);
  };
  public static getInternshipForIntern = async () => {
    return appAxios.get("/internships/intern").then((res) => res.data);
  };
}
