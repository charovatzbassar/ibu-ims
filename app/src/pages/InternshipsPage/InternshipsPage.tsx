import { useInternshipListings } from "@/hooks";
import React from "react";
import { CircularProgress } from "@mui/material";

const InternshipsPage: React.FC = () => {
  const { data, isPending, isError, error } = useInternshipListings();

  let content;

  if (isPending) {
    content = <CircularProgress />;
  }

  if (data) {
    content = <div>{data.map((internshipListing) => {
      return <div key={internshipListing.listingID}>{internshipListing.position}</div>;
    })}</div>;
  }

  return <>{content}</>;
};

export default InternshipsPage;
