import appAxios from "./appAxios";

export default class InternshipsService {
  public static getInternships = async () => {
    return appAxios.get("/internships").then((res) => res.data);
  };
  public static createInternship = async (
    companyID: string,
    interns: string[]
  ) => {
    return appAxios
      .post("/internships", { companyID, interns })
      .then((res) => res.data);
  };
}
