import appAxios from "./appAxios";

export default class InternshipsService {
  public static createInternship = async (
    companyID: string,
    interns: string[]
  ) => {
    return appAxios.post("/internships", { companyID, interns });
  };
}
