import appAxios from "./appAxios";
import { Application } from "./types";

export default class ApplicationsService {
  public static createApplication = async (listingID: string) => {
    return appAxios
      .post("/applications", { listingID })
      .then((res) => res.data);
  };
}
