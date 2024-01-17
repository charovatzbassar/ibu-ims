import appAxios from "./appAxios";
import { Company } from "./types";

export default class CompaniesService {
  public static getCompanies = async (): Promise<Company[]> => {
    return appAxios.get("/companies").then((res) => res.data);
  };

  public static getCompany = async (id: string) => {
    return appAxios.get(`/companies/${id}`).then((res) => res.data);
  };

  public static createCompany = async () => {
    return appAxios.post("/companies").then((res) => res.data);
  };

  public static editCompany = async (id: string) => {
    return appAxios.put(`/companies/${id}`).then((res) => res.data);
  };

  public static deleteCompany = async (id: string) => {
    return appAxios.delete(`/companies/${id}`).then((res) => res.data);
  };
}
