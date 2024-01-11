import appAxios from "./appAxios";

export const getCompanies = async () => {
  try {
    const res = await appAxios.get("/companies");
    return res.data;
  } catch (e) {
    return [];
  }
};

export const getCompany = async (id: string) => {
  try {
    const res = await appAxios.get(`/companies/${id}`);
    return res.data;
  } catch (e) {
    return {};
  }
};

export const createCompany = async () => {
  try {
    await appAxios.post("/companies");
  } catch (e) {
    return { error: e, message: "Could not create company" };
  }
};

export const editCompany = async (id: string) => {
  try {
    await appAxios.put(`/companies/${id}`);
  } catch (e) {
    return { error: e, message: "Could not edit company" };
  }
};

export const deleteCompany = async (id: string) => {
  try {
    await appAxios.delete(`/companies/${id}`);
  } catch (e) {
    return { error: e, message: "Could not delete company" };
  }
};
