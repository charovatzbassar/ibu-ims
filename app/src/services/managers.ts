import appAxios from "./appAxios";
import { Manager, ManagerFormValues } from "./types";

export default class ManagersService {
  public static getManagers = async (): Promise<Manager[]> => {
    return appAxios
      .get("/managers")
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getManager = async (id: string) => {
    return appAxios
      .get(`/managers/${id}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static createManager = async (data: ManagerFormValues) => {
    return appAxios
      .post("/managers", data)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static editManager = async (id: string, data: ManagerFormValues) => {
    return appAxios
      .put(`/managers/${id}`, data)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static changeManagerStatus = async (id: string, status: string) => {
    return appAxios
      .put(`/managers/${id}/status?status=${status}`)
      .then((res) => res.data)
      .catch((error) => error);
  };
}
