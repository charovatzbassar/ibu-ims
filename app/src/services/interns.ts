import appAxios from "./appAxios";

export default class InternsService {
  public static getInterns = async (status: string) => {
    return appAxios
      .get(`/interns?status=${status}`)
      .then((res) => res.data)
      .catch((err) => err);
  };
  public static getIntern = async (internID: string) => {
    return appAxios
      .get(`/interns/${internID}`)
      .then((res) => res.data)
      .catch((err) => err);
  };

  public static getInternsByCompany = async () => {
    return appAxios
      .get(`/interns/company`)
      .then((res) => res.data)
      .catch((err) => err);
  };
}
