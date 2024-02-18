import appAxios from "./appAxios";

export default class InternshipsService {
  public static createInternship = async (
    listingID: string,
    interns: string[]
  ) => {
    return appAxios
      .post("/internships", { listingID, interns })
      .then((res) => res.data)
      .catch((error) => error);
  };
  public static createInternshipFinalReport = async (
    internshipID: string,
    finalReport: string
  ) => {
    return appAxios
      .put(`/internships/${internshipID}/report`, { finalReport })
      .then((res) => res.data)
      .catch((error) => error);
  };
  public static getInternshipForIntern = async () => {
    return appAxios
      .get("/internships/intern")
      .then((res) => res.data)
      .catch((error) => error);
  };
  public static getInternships = async () => {
    return appAxios
      .get("/internships")
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getInternship = async (internshipID: string) => {
    return appAxios
      .get(`/internships/${internshipID}`)
      .then((res) => res.data)
      .catch((error) => error);
  };
}
