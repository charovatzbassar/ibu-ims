import React from "react";
import { InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";
import { useCreateInternshipListing } from "@/hooks";
import { InternshipListingFormValues } from "@/services/types";

const CreateListingPage: React.FC = () => {
  const { mutate, isError, isPending } = useCreateInternshipListing();

  const onSubmit = (data: InternshipListingFormValues) => {
    mutate({
      position: data.position,
      listingDescription: data.listingDescription,
      location: data.location,
      requirements: data.requirements,
      noOfPlaces: Number(data.noOfPlaces),
      startDate: new Date(data.startDate.$d)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      endDate: new Date(data.endDate.$d)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
    });
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
