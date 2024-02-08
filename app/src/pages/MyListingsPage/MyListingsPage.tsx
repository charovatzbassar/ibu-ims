import React from "react";
import { useInternshipListingsByCompany } from "@/hooks";


const MyListingsPage = () => {
  const { data, isPending, isError } = useInternshipListingsByCompany();

  return <div>MyListingsPage</div>;
};

export default MyListingsPage;
