import appAxios from "./appAxios";

export default class CompaniesService {
  getCompanies = async () => {
    try {
      const res = await appAxios.get("/companies");
      return res.data;
    } catch (e) {
      return [];
    }
  };

  getCompany = async (id: string) => {
    try {
      const res = await appAxios.get(`/companies/${id}`);
      return res.data;
    } catch (e) {
      return {};
    }
  };

  createCompany = async () => {
    try {
      await appAxios.post("/companies");
    } catch (e) {
      return { error: e, message: "Could not create company" };
    }
  };

  editCompany = async (id: string) => {
    try {
      await appAxios.put(`/companies/${id}`);
    } catch (e) {
      return { error: e, message: "Could not edit company" };
    }
  };

  deleteCompany = async (id: string) => {
    try {
      await appAxios.delete(`/companies/${id}`);
    } catch (e) {
      return { error: e, message: "Could not delete company" };
    }
  };
}
