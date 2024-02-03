import appAxios from "./appAxios";
import { InternshipListing, InternshipListingFormValues } from "./types";

export default class InternshipListingsService {
  public static getInternshipListings = async (): Promise<
    InternshipListing[]
  > => {
    return appAxios.get("/internships").then((res) => res.data);
  };

  public static getInternshipListing = async (
    id: string
  ): Promise<InternshipListing> => {
    return appAxios.get(`/internships/${id}`).then((res) => res.data);
  };

  public static createInternshipListing = async (
    data: InternshipListingFormValues
  ) => {
    return appAxios.post("/internships", data).then((res) => res.data);
  };

  public static editInternshipListing = async (id: string) => {
    return appAxios.put(`/internships/${id}`).then((res) => res.data);
  };

  public static deleteInternshipListing = async (id: string) => {
    return appAxios.delete(`/internships/${id}`).then((res) => res.data);
  };
}
