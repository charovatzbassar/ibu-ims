import appAxios from "./appAxios";

export default class InternshipListingsService {
  public static getInternshipListings = async () => {
    try {
      const res = await appAxios.get("/internships");
      return res.data;
    } catch (e) {
      return [];
    }
  };
  public static getInternshipListing = async (id: string) => {
    try {
      const res = await appAxios.get(`/internships/${id}`);
      return res.data;
    } catch (e) {
      return {};
    }
  };

  public static createInternshipListing = async () => {
    try {
      await appAxios.post("/internships");
    } catch (e) {
      return { error: e, message: "Could not create internship listing" };
    }
  };

  public static editInternshipListing = async (id: string) => {
    try {
      await appAxios.put(`/internships/${id}`);
    } catch (e) {
      return { error: e, message: "Could not edit internship listing" };
    }
  };

  public static deleteInternshipListing = async (id: string) => {
    try {
      await appAxios.delete(`/internships/${id}`);
    } catch (e) {
      return { error: e, message: "Could not delete internship listing" };
    }
  };
}
