import React from "react";
import { InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";
import { useCreateInternshipListing } from "@/hooks";

const CreateListingPage: React.FC = () => {
  const { mutate, isError, isPending } = useCreateInternshipListing();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <InternshipListingForm
        onSubmit={onSubmit}
        action={FormAction.CREATE}
        isError={isError}
        isPending={isPending}
      />
    </>
  );
};

export default CreateListingPage;
