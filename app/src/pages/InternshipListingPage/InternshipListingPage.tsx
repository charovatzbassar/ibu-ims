import { useDeleteInternshipListing, useInternshipListing } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { InternshipListingContent } from "./components";
import { isListingOwner } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const InternshipListingPage = () => {
  const { listingID } = useParams();
  const { data, isPending, isError } = useInternshipListing(listingID || "");
  const {
    mutate,
    isPending: isDeletionPending,
    isError: isDeletionError,
    isSuccess: isDeletionSuccess,
  } = useDeleteInternshipListing(listingID || "");

  const user = useSelector((state: RootState) => state.auth.user);

  const isOwner = isListingOwner(data, user);

  return (
    <>
      {isPending && <CircularProgress />}
      {!isPending && !isError && (
        <InternshipListingContent
          data={data}
          isOwner={isOwner}
          onDelete={() => {
            mutate();
          }}
        />
      )}
      {isDeletionSuccess && <Navigate to="/home/dashboard" />}
    </>
  );
};

export default InternshipListingPage;
