import appAxios from "./appAxios";

export default class InternshipDaysService {
  public static getInternshipDays = async (internshipID: string) => {
    return appAxios
      .get(`/internship-days/${internshipID}`)
      .then((res) => res.data);
  };
  public static createInternshipDay = async (
    internshipID: string,
    description: string
  ) => {
    return appAxios.post(`/internship-days/${internshipID}`, { description });
  };

  public static modifyInternshipDayStatus = async (
    dayID: string,
    status: string
  ) => {
    return appAxios.put(`/internship-days/${dayID}`, { status });
  };

  public static approveAllInternshipDays = async (internshipID: string) => {
    return appAxios.put(`/internship-days/${internshipID}/all`);
  };
}
