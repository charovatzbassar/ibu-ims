export type InternshipListing = {
  readonly listingID: string;
  readonly company: Company;
  readonly position: string;
  readonly listingDescription: string;
  readonly location: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly requirements: string;
  readonly noOfPlaces: number;
  readonly listingStatus: string;
};

export type Company = {
  readonly companyID: string;
  readonly companyName: string;
  readonly location: string;
  readonly contactEmail: string;
  readonly companyLogo: string;
};

export type Intern = {
  readonly internID: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string | null;
  readonly email: string;
};

export type Manager = {
  readonly managerID: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string | null;
  readonly email: string;
};

export type User = {
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly email: string | null;
  readonly role: string | null;
  readonly token: string | null;
};

export type InternshipListingFormValues = {
  position: string;
  listingDescription: string;
  location: string;
  startDate: string;
  endDate: string;
  requirements: string;
  noOfPlaces: number;
};

export type Application = {
  readonly applicationID: string;
  readonly listingID: string;
  readonly internID: string;
  readonly applicationStatus: string;
  readonly intern: Intern;
  readonly internship_listing: InternshipListing;
};

export type Internship = {
  readonly internshipID: string;
  readonly intern: Intern;
  readonly internID: string;
  readonly company: Company;
  readonly companyID: string;
  readonly manager: Manager;
  readonly managerID: string;
  readonly status: string;
  readonly listingID: string;
  readonly internship_listing: InternshipListing;
  readonly finalReport: string;
};

export type InternshipDay = {
  readonly dayID: string;
  readonly dayDescription: string;
  readonly status: string;
  readonly internshipID: string;
  readonly internship: Internship;
  readonly workdayDate: Date;
};
