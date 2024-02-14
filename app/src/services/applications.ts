import appAxios from "./appAxios";

export default class ApplicationsService {
  public static createApplication = async (listingID: string) => {
    return appAxios
      .post("/applications", { listingID })
      .then((res) => res.data);
  };

  public static getApplications = async (listingID: string, status: string) => {
    return appAxios
      .get(`/applications/${listingID}/${status}`)
      .then((res) => res.data);
  };

  public static modifyApplicationStatus = async (
    applicationID: string,
    status: string
  ) => {
    return appAxios.put(`/applications/${applicationID}`, { status });
  };
}