import React from "react";
import { InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";
import { useCreateInternshipListing } from "@/hooks";
import { Box } from "@mui/material";

const CreateListingPage: React.FC = () => {
  const { mutate, isError, isPending, error } = useCreateInternshipListing();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <InternshipListingForm onSubmit={onSubmit} action={FormAction.CREATE} />
    </>
  );
};

export default CreateListingPage;
