export type InternshipListing = {
  readonly listingID: number;
  readonly companyID: number;
  readonly position: string;
  readonly listingDescription: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly requirements?: string;
  readonly noOfPlaces: number;
};

export type Company = {
  readonly companyID: number;
  readonly companyName: string;
  readonly location: string;
  readonly contactEmail: string;
  readonly companyLogo: string;
};

export type User = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: string;
  readonly token: string;
};
