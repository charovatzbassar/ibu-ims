import { useInternshipListings } from "@/hooks";
import React from "react";
import { CircularProgress } from "@mui/material";

const InternshipListingsPage: React.FC = () => {
  const { data, isPending } = useInternshipListings();

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

export default InternshipListingsPage;
