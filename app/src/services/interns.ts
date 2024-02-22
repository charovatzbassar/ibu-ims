import appAxios from "./appAxios";

export default class InternsService {
  public static getInterns = async (searchTerm: string) => {
    let url: string = "/interns?searchTerm=";

    if (searchTerm) {
      url = url + searchTerm;
    }
    
    return appAxios
      .get(url)
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
