import appAxios from "./appAxios";

export default class InternshipDaysService {
  public static getInternshipDays = async (internshipID: string) => {
    return appAxios
      .get(`/internship-days/${internshipID}`)
      .then((res) => res.data)
      .catch((error) => error);
  };
  public static createInternshipDay = async (
    internshipID: string,
    description: string
  ) => {
    return appAxios
      .post(`/internship-days/${internshipID}`, { description })
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static modifyInternshipDayStatus = async (
    dayID: string,
    status: string
  ) => {
    return appAxios
      .put(`/internship-days/${dayID}`, { status })
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static approveAllInternshipDays = async (internshipID: string) => {
    return appAxios
      .put(`/internship-days/${internshipID}/all`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getInternshipDayByDate = async (
    internshipID: string,
    date: string
  ) => {
    return appAxios
      .get(`/internship-days/${internshipID}/${date}`)
      .then((res) => res.data)
      .catch((error) => error);
  };
}
