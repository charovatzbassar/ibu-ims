import appAxios from "./appAxios";

export default class InternsService {
  public static getInterns = async () => {
    return appAxios
      .get("/interns")
      .then((res) => res.data)
      .catch((err) => err);
  };
  public static getIntern = async (internID: string) => {
    return appAxios
      .get(`/interns/${internID}`)
      .then((res) => res.data)
      .catch((err) => err);
  };
}
