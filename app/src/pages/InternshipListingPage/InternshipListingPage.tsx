import React from "react";
import { useInternshipListing } from "@/hooks";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const InternshipListingPage = () => {
  const { listingID } = useParams();
  const { data, isLoading, isError } = useInternshipListing(listingID || "");

  return (
    <>
      {isLoading && <CircularProgress />}
      {data?.position ? data.position : "Listing not found"}
    </>
  );
};

export default InternshipListingPage;
