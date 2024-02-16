import appAxios from "./appAxios";

export default class InternshipDaysService {
  public static createInternshipDay = async (
    internshipID: string,
    description: string
  ) => {
    return appAxios.post(`/internship-days/${internshipID}`, { description });
  };
}
