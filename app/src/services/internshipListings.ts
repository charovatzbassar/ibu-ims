import appAxios from "./appAxios";
import { InternshipListing, InternshipListingFormValues } from "./types";

export default class InternshipListingsService {
  public static getInternshipListings = async (
    searchTerm: string
  ): Promise<InternshipListing[]> => {
    let url: string = "/internship-listings";

    if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }
    return appAxios
      .get(url)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getInternshipListing = async (
    id: string
  ): Promise<InternshipListing> => {
    return appAxios
      .get(`/internship-listings/${id}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static createInternshipListing = async (
    data: InternshipListingFormValues
  ) => {
    return appAxios
      .post("/internship-listings", data)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static editInternshipListing = async (
    id: string,
    newData: InternshipListingFormValues
  ) => {
    return appAxios
      .put(`/internship-listings/${id}`, newData)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static deleteInternshipListing = async (id: string) => {
    return appAxios
      .delete(`/internship-listings/${id}`)
      .then((res) => res.data)
      .catch((error) => error);
  };

  public static getInternshipListingsByCompany = async (): Promise<
    InternshipListing[]
  > => {
    return appAxios
      .get("/internship-listings/company")
      .then((res) => res.data)
      .catch((error) => error);
  };
}
