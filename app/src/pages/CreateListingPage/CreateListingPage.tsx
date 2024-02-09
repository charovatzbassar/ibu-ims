import React from "react";
import { ErrorAlert, InternshipListingForm } from "@/components";
import { FormAction } from "@/utils";
import { useCreateInternshipListing } from "@/hooks";
import { InternshipListingFormValues } from "@/services/types";
import { Navigate } from "react-router-dom";

const CreateListingPage: React.FC = () => {
  const { mutate, isError, isPending, isSuccess, data } =
    useCreateInternshipListing();

  const onSubmit = (data: InternshipListingFormValues) => {
    mutate({
      position: data.position,
      listingDescription: data.listingDescription,
      location: data.location,
      requirements: data.requirements,
      noOfPlaces: Number(data.noOfPlaces),
      startDate: new Date(data.startDate)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      endDate: new Date(data.endDate)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
    });
  };

  if (isSuccess && data?.listingID) {
    return <Navigate to={`/home/internship-listings/${data.listingID}`} />;
  }

  return (
    <>
      {isError && <ErrorAlert />}
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
