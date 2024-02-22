import appAxios from "./appAxios";

export default class InternsService {
  public static getInterns = async (
    searchTerm: string,
    searchStatus: string
  ) => {
    let url: string = "/interns";

    if (searchTerm && searchStatus) {
      url = url + "?searchTerm=" + searchTerm + "&searchStatus=" + searchStatus;
    }

    if (searchTerm && !searchStatus) {
      url = url + "?searchTerm=" + searchTerm;
    }

    if (!searchTerm && searchStatus) {
      url = url + "?searchStatus=" + searchStatus;
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
