import { InternshipListingForm } from "@/components";
import { FormAction, isListingOwner } from "@/utils";
import { useEditInternshipListing, useInternshipListing } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const EditListingPage = () => {
  const { listingID } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data } = useInternshipListing(listingID || "");

  const { mutate, isError, isPending } = useEditInternshipListing(
    listingID || ""
  );

  const onSubmit = () => {
    console.log("Update");
  };

  return (
    <>
      {!isListingOwner(data, user) && (
        <Navigate to="/home/internship-listings" />
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
