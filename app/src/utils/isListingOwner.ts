import { InternshipListing, User } from "@/services/types";

const isListingOwner = (listing: InternshipListing | undefined, user: User) => {
  return listing?.company.contactEmail === user.email;
};

export default isListingOwner;
