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
import { Application, Intern } from "@/services/types";

const InternshipListingPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [startInternshipModalOpen, setStartInternshipModalOpen] =
    React.useState<boolean>(false);

  const { listingID } = useParams();

  const { data, isPending, isError } = useInternshipListing(listingID || "");
  const {
    mutate: deleteListing,
    isSuccess: isDeletionSuccess,
    data: deletionData,
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
    isSuccess: isApplicationSuccess,
    data: applicationData,
  } = useCreateApplication();

  const modifyHook = useModifyApplicationStatus();

  const {
    mutate: createInternship,
    isSuccess: createInternshipSuccess,
    data: createInternshipData,
  } = useCreateInternship();

  const user = useSelector((state: RootState) => state.auth.user);

  const isOwner = isListingOwner(data, user);

  return (
    <>
      {!data && <ErrorAlert />}
      {user.role === "company" && createInternshipData && (
        <ErrorAlert
          message={`${
            createInternshipData.response?.data.error
          } (${createInternshipData?.response?.data.interns?.map(
            (intern: Intern) => `${intern.firstName} ${intern.lastName}, `
          )})`}
        />
      )}
      {user.role === "company" &&
        !createInternshipData?.response?.data.error &&
        createInternshipSuccess && <Navigate to="/home/my-internships" />}
      {user.role === "company" && modifyHook.isSuccess && (
        <SuccessAlert content="Application status updated successfully!" />
      )}
      {user.role === "intern" &&
        isApplicationSuccess &&
        !applicationData?.response?.data?.error && (
          <SuccessAlert content="Application submitted successfully!" />
        )}
      {user.role === "intern" && applicationData?.response?.data?.error && (
        <ErrorAlert message={applicationData?.response?.data?.error} />
      )}
      {user.role === "company" && applicationData && <ErrorAlert />}
      {user.role === "company" && deletionData && <ErrorAlert />}

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
        data?.noOfPlaces &&
        approvedApplications?.length < data.noOfPlaces && (
          <ApplicationTable data={applications} modifyHook={modifyHook} />
        )}

      {user.role === "company" && isApprovedApplicationsPending && isOwner && (
        <CircularProgress />
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
            <ApplicationTable
              data={approvedApplications}
              modifyHook={modifyHook}
            />
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
                  listingID: listingID || "",
                  interns: approvedApplications.map(
                    (app: Application) => app.internID
                  ),
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
