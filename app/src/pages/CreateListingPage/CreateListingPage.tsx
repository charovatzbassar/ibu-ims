import React from "react";
import { InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";
import { useCreateInternshipListing } from "@/hooks";
import { InternshipListingFormValues } from "@/services/types";

const CreateListingPage: React.FC = () => {
  const { mutate, isError, isPending } = useCreateInternshipListing();

  const onSubmit = (data: InternshipListingFormValues) => {
    console.log(data.startDate.$d.toISOString().split("T")[0]);
    console.log(data.endDate.$d.toISOString().split("T")[0]);
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
