import {
  useCreateApplication,
  useDeleteInternshipListing,
  useInternshipListing,
} from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { Alert, Button, CircularProgress } from "@mui/material";
import { InternshipListingContent } from "./components";
import { isListingOwner } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const InternshipListingPage = () => {
  const { listingID } = useParams();
  const { data, isPending, isError } = useInternshipListing(listingID || "");
  const {
    mutate,
    isError: isDeletionError,
    isSuccess: isDeletionSuccess,
  } = useDeleteInternshipListing(listingID || "");

  const { mutate: apply } = useCreateApplication();

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
      {isDeletionError && (
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
      {user.role === "intern" && (
        <Button
          color="success"
          variant="contained"
          sx={{ margin: "10px" }}
          onClick={() => apply(data?.listingID || "")}
        >
          Apply
        </Button>
      )}
    </>
  );
};

export default InternshipListingPage;
