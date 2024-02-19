import { ErrorAlert, InternshipListingForm } from "@/components";
import { FormAction, isListingOwner } from "@/utils";
import { useEditInternshipListing, useInternshipListing } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { InternshipListingFormValues } from "@/services/types";

const EditListingPage = () => {
  const { listingID } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data } = useInternshipListing(listingID || "");

  const {
    mutate,
    isError,
    isPending,
    isSuccess,
    data: mutateData,
  } = useEditInternshipListing(listingID || "");

  const onSubmit = (newData: InternshipListingFormValues) => {
    mutate({
      position: newData.position,
      listingDescription: newData.listingDescription,
      location: newData.location,
      requirements: newData.requirements,
      noOfPlaces: Number(newData.noOfPlaces),
      startDate: new Date(newData.startDate)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      endDate: new Date(newData.endDate)
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
    });
  };

  if (isSuccess && data?.listingID && !mutateData.response?.data.error) {
    return <Navigate to={`/home/internship-listings/${data.listingID}`} />;
  }

  return (
    <>
      {!isListingOwner(data, user) && (
        <Navigate to="/home/internship-listings" />
      )}
      {mutateData && <ErrorAlert message={mutateData.response.data.error} />}
      <InternshipListingForm
        action={FormAction.UPDATE}
        onSubmit={onSubmit}
        isError={isError}
        isPending={isPending}
        data={data}
      />
    </>
  );
};

export default EditListingPage;
