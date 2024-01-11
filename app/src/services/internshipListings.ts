import appAxios from "./appAxios";

export const getInternshipListings = async () => {
  try {
    const res = await appAxios.get("/internships");
    return res.data;
  } catch (e) {
    return [];
  }
};

export const getInternshipListing = async (id: string) => {
  try {
    const res = await appAxios.get(`/internships/${id}`);
    return res.data;
  } catch (e) {
    return {};
  }
};

export const createInternshipListing = async () => {
  try {
    await appAxios.post("/internships");
  } catch (e) {
    return { error: e, message: "Could not create internship listing" };
  }
};

export const editInternshipListing = async (id: string) => {
  try {
    await appAxios.put(`/internships/${id}`);
  } catch (e) {
    return { error: e, message: "Could not edit internship listing" };
  }
};

export const deleteInternshipListing = async (id: string) => {
  try {
    await appAxios.delete(`/internships/${id}`);
  } catch (e) {
    return { error: e, message: "Could not delete internship listing" };
  }
};
