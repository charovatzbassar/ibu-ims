import { useInternshipListings } from "@/hooks";
import React from "react";
import { CircularProgress } from "@mui/material";

const InternshipsPage: React.FC = () => {
  const { data, isPending, isError, error } = useInternshipListings();

  return (
    <>
      {isPending && <CircularProgress />}
      {data && (
        <div>
          {data.map((internshipListing) => {
            return (
              <div key={internshipListing.listingID}>
                {internshipListing.position}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default InternshipsPage;
