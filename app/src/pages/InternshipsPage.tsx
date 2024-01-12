import React from "react";
import { getInternshipListings } from "../services/internshipListings";
import { Internship } from "../utils/types";
import { useQuery } from "@tanstack/react-query";

const InternshipsPage: React.FC = () => {
  const { data: internships } = useQuery({
    queryKey: ["internships"],
    queryFn: getInternshipListings,
  });

  return (
    <>
      {internships?.map((internship: Internship) => (
        <div key={internship.listingID}>
          {internship.position} - {internship.listingDescription}
        </div>
      ))}
    </>
  );
};

export default InternshipsPage;
