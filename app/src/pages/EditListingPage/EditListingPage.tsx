import { InternshipListingForm } from "@/components";
import { FormAction, isListingOwner } from "@/utils";
import { useEditInternshipListing, useInternshipListing } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { InternshipListingFormValues } from "@/services/types";
import { Alert } from "@mui/material";

const EditListingPage = () => {
  const { listingID } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data } = useInternshipListing(listingID || "");

  const { mutate, isError, isPending, isSuccess } = useEditInternshipListing(
    listingID || ""
  );

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

  if (isSuccess && data?.listingID) {
    return <Navigate to={`/home/internship-listings/${data.listingID}`} />;
  }

  return (
    <>
      {!isListingOwner(data, user) && (
        <Navigate to="/home/internship-listings" />
      )}
      {isError && (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Alert severity="error" sx={{ position: "fixed" }}>
            An error occured. Please try again later.
          </Alert>{" "}
        </div>
      )}
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
