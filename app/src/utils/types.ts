export type Internship = {
  readonly listingID: number;
  position: string;
  listingDescription: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
};
