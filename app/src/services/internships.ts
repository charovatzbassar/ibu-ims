import appAxios from "./appAxios";

export default class InternshipsService {
  public static createInternship = async (
    companyID: string,
    internID: string
  ) => {
    return appAxios.post("/internships", { companyID, internID });
  };
}
