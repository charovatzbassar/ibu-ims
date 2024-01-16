import appAxios from "./appAxios";

export default class CompaniesService {
  public static getCompanies = async () => {
    try {
      const res = await appAxios.get("/companies");
      return res.data;
    } catch (e) {
      return [];
    }
  };

  public static getCompany = async (id: string) => {
    try {
      const res = await appAxios.get(`/companies/${id}`);
      return res.data;
    } catch (e) {
      return {};
    }
  };

  public static createCompany = async () => {
    try {
      await appAxios.post("/companies");
    } catch (e) {
      return { error: e, message: "Could not create company" };
    }
  };

  public static editCompany = async (id: string) => {
    try {
      await appAxios.put(`/companies/${id}`);
    } catch (e) {
      return { error: e, message: "Could not edit company" };
    }
  };

  public static deleteCompany = async (id: string) => {
    try {
      await appAxios.delete(`/companies/${id}`);
    } catch (e) {
      return { error: e, message: "Could not delete company" };
    }
  };
}
