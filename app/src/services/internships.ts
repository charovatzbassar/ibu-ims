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
}
