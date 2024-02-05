import appAxios from "./appAxios";
import { InternshipListing, InternshipListingFormValues } from "./types";

export default class InternshipListingsService {
  public static getInternshipListings = async (): Promise<
    InternshipListing[]
  > => {
    return appAxios.get("/internship-listings").then((res) => res.data);
  };

  public static getInternshipListing = async (
    id: string
  ): Promise<InternshipListing> => {
    return appAxios.get(`/internship-listings/${id}`).then((res) => res.data);
  };

  public static createInternshipListing = async (
    data: InternshipListingFormValues
  ) => {
    return appAxios.post("/internship-listings", data).then((res) => res.data);
  };

  public static editInternshipListing = async (id: string) => {
    return appAxios.put(`/internship-listings/${id}`).then((res) => res.data);
  };

  public static deleteInternshipListing = async (id: string) => {
    return appAxios
      .delete(`/internship-listings/${id}`)
      .then((res) => res.data);
  };
}
