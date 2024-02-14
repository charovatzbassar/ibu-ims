import {
  useCreateApplication,
  useCreateInternship,
  useDeleteInternshipListing,
  useInternshipListing,
  useModifyApplicationStatus,
} from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import { InternshipListingContent, ApplicationTable } from "./components";
import { isListingOwner } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import React from "react";
import { ConfirmModal, ErrorAlert, SuccessAlert } from "@/components";
import { useApplications } from "@/hooks";

const InternshipListingPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [startInternshipModalOpen, setStartInternshipModalOpen] =
    React.useState<boolean>(false);

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
  } = useApplications(listingID || "", "PENDING");

  const {
    data: approvedApplications,
    isPending: isApprovedApplicationsPending,
    isError: isApprovedApplicationsError,
  } = useApplications(listingID || "", "APPROVED");

  const {
    mutate: apply,
    isError: isApplicationError,
    isSuccess: isApplicationSuccess,
  } = useCreateApplication();

  const modifyHook = useModifyApplicationStatus();

  const { mutate: createInternship, isSuccess: createInternshipSuccess } =
    useCreateInternship();

  const user = useSelector((state: RootState) => state.auth.user);

  const isOwner = isListingOwner(data, user);

  return (
    <>
      {modifyHook.isSuccess && (
        <SuccessAlert content="Application status updated successfully!" />
      )}
      {isApplicationSuccess && (
        <SuccessAlert content="Application submitted successfully!" />
      )}
      {user.role === "company" && isApplicationError && <ErrorAlert />}
      {isDeletionError && <ErrorAlert />}

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
      {user.role === "company" && isApplicationsPending && isOwner && (
        <CircularProgress />
      )}
      {user.role === "company" &&
        isOwner &&
        applications?.length === 0 &&
        approvedApplications?.length !== data?.noOfPlaces && (
          <Card sx={{ padding: "20px", marginY: "20px" }}>
            There are no pending applications.
          </Card>
        )}
      {user.role === "company" &&
        isOwner &&
        approvedApplications?.length === data?.noOfPlaces && (
          <Card sx={{ padding: "20px", marginY: "20px" }}>
            All places have been filled.
          </Card>
        )}
      {user.role === "company" &&
        applications?.length > 0 &&
        !isApplicationsPending &&
        !isApplicationsError &&
        isOwner &&
        approvedApplications?.length < 4 && (
          <ApplicationTable data={applications} modifyHook={modifyHook} />
        )}

      {user.role === "company" &&
        approvedApplications?.length > 0 &&
        !isApprovedApplicationsPending &&
        !isApprovedApplicationsError &&
        isOwner && (
          <>
            <Typography variant="h6" component="h2" sx={{ marginTop: "10px" }}>
              Approved Applications
            </Typography>
            <ApplicationTable data={approvedApplications} />
          </>
        )}

      {user.role === "company" &&
        approvedApplications?.length > 0 &&
        isOwner && (
          <>
            <Button
              variant="contained"
              color="success"
              sx={{ marginY: "10px" }}
              onClick={() => setStartInternshipModalOpen(true)}
            >
              Start Internship
            </Button>

            <ConfirmModal
              onClick={() => {
                setStartInternshipModalOpen(false);
                createInternship({
                  companyID: data?.company.companyID || "",
                  internID: approvedApplications[0].internID,
                });
              }}
              buttonColor="success"
              modalOpen={startInternshipModalOpen}
              closeModal={() => setStartInternshipModalOpen(false)}
            >
              <Typography variant="h6" component="h2">
                Are you sure you wish to start the internship?
              </Typography>
            </ConfirmModal>
          </>
        )}

      {user.role === "company" &&
        approvedApplications?.length === 0 &&
        isOwner && (
          <>
            <Card sx={{ padding: "20px", marginY: "20px" }}>
              There are no approved applications.
            </Card>
          </>
        )}
      {isDeletionSuccess && <Navigate to="/home/dashboard" />}
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
