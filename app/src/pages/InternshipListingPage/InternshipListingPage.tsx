import {
  useCreateApplication,
  useDeleteInternshipListing,
  useInternshipListing,
} from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { Alert, Button, CircularProgress, Typography } from "@mui/material";
import { InternshipListingContent, ApplicationTable } from "./components";
import { isListingOwner } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import React from "react";
import { ConfirmModal, ErrorAlert } from "@/components";
import { useApplications } from "@/hooks";

const InternshipListingPage = () => {
  const { listingID } = useParams();
  const { data, isPending, isError } = useInternshipListing(listingID || "");
  const {
    mutate: deleteListing,
    isError: isDeletionError,
    isSuccess: isDeletionSuccess,
  } = useDeleteInternshipListing(listingID || "");

  const {
    data: applications,
    isPending: isApplicationsPending,
    isError: isApplicationsError,
  } = useApplications(listingID || "");

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const {
    mutate: apply,
    isError: isApplicationError,
    isSuccess: isApplicationSuccess,
  } = useCreateApplication();

  const user = useSelector((state: RootState) => state.auth.user);

  const isOwner = isListingOwner(data, user);

  return (
    <>
      {isApplicationSuccess && (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Alert severity="success" sx={{ position: "fixed" }}>
            Applied successfully!
          </Alert>{" "}
        </div>
      )}
      {isApplicationError && <ErrorAlert />}
      {isPending && <CircularProgress />}
      {!isPending && !isError && (
        <InternshipListingContent
          data={data}
          isOwner={isOwner}
          onDelete={() => {
            deleteListing();
          }}
        />
      )}
      {isApplicationsPending && <CircularProgress />}
      {user.role === "company" &&
        !isApplicationsPending &&
        !isApplicationsError && <ApplicationTable data={applications} />}
      {isDeletionSuccess && <Navigate to="/home/dashboard" />}
      {isDeletionError && <ErrorAlert />}
      {user.role === "intern" && (
        <>
          <Button
            color="success"
            variant="contained"
            sx={{ margin: "10px" }}
            onClick={() => setModalOpen(true)}
          >
            Apply
          </Button>

          <ConfirmModal
            onClick={() => {
              setModalOpen(false);
              apply(data?.listingID || "");
            }}
            buttonColor="success"
            modalOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
          >
            <Typography variant="h6" component="h2">
              Are you sure you wish to apply for this internship?
            </Typography>
          </ConfirmModal>
        </>
      )}
    </>
  );
};

export default InternshipListingPage;
