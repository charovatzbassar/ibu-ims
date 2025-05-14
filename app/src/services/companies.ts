import appAxios from "./appAxios";
import { Company, CompanyFormValues } from "./types";

export default class CompaniesService {
  public static getCompanies = async (): Promise<Company[]> => {
    return appAxios
      .get("/companies")
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getCompany = async (id: string) => {
    return appAxios
      .get(`/companies/${id}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static createCompany = async (data: CompanyFormValues) => {
    return appAxios
      .post("/companies", data)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static editCompany = async (id: string, data: CompanyFormValues) => {
    return appAxios
      .put(`/companies/${id}`, data)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static changeCompanyStatus = async (id: string, status: string) => {
    return appAxios
      .put(`/companies/${id}/status?status=${status}`)
      .then((res) => res.data)
      .catch((error) => error);
  };
}
