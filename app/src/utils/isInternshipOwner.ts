import { Internship, User } from "@/services/types";

const isInternshipOwner = (internship: Internship | undefined, user: User) => {
  return internship?.company.contactEmail === user.email;
};

export default isInternshipOwner;
