import {
  useChangeManagerStatus,
  useCompanies,
  useCreateCompany,
  useManagers,
} from "@/hooks";
import {
  Button,
  CircularProgress,
  Fade,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Add, CasesRounded, Person } from "@mui/icons-material";
import { ConfirmModal, DataTable, IconText, SuccessAlert } from "@/components";
import { FormAction, generateColumns, modalStyle } from "@/utils";
import { Company, CompanyFormValues, Manager } from "@/services/types";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CompanyForm from "../CompanyForm";
import CompanyRow from "../CompanyRow";

const AdminDashboard = () => {
  const { data: companies, isPending: isCompaniesPending } = useCompanies();
  const { data: managers, isPending: isManagersPending } = useManagers();
  const { mutate, isError, isPending, isSuccess } = useCreateCompany();
  const { mutate: changeStatus, isSuccess: isChangeStatusSuccess } =
    useChangeManagerStatus();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [changeManagerModalOpen, setChangeManagerModalOpen] = useState(false);
  const [isRowSuccess, setIsRowSuccess] = useState(false);
  const [currentManager, setCurrentManager] = useState({} as Manager);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    managers?.find((manager) => manager.status === "ACTIVE")
      ? setCurrentManager(
          managers?.find((manager) => manager.status === "ACTIVE")!
        )
      : setCurrentManager({} as Manager);
  }, [managers]);

  const [selectedManager, setSelectedManager] = useState(
    currentManager?.managerID || ""
  );

  const onSubmit = (data: CompanyFormValues) => {
    mutate({
      companyName: data.companyName,
      contactEmail: data.contactEmail,
      location: data.location,
    });

    setFormModalOpen(false);
  };

  return (
    <>
      {isRowSuccess && <SuccessAlert content="Company edited successfully!" />}
      {isSuccess && <SuccessAlert content="Company created successfully!" />}
      {isChangeStatusSuccess && (
        <SuccessAlert content="Manager changed successfully!" />
      )}
      {isManagersPending && <CircularProgress />}
      {!isManagersPending && (
        <IconText
          icon={<Person />}
          text={`Current manager - ${currentManager?.firstName} ${currentManager?.lastName}`}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingX: 2,
              paddingY: 1,
            }}
          ></Box>
        </IconText>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 2,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={() => setChangeManagerModalOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          <Add /> Change Manager
        </Button>
      </Box>
      <IconText icon={<CasesRounded />} text="List of companies" />
      {isCompaniesPending && <CircularProgress />}
      {companies && !isCompaniesPending && (
        <>
          <DataTable
            rows={companies}
            columns={[
              ...generateColumns<Company>(companies[0]),
              {
                field: "actions",
                headerName: "Actions",
                width: 260,
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                  <CompanyRow
                    params={params}
                    setIsRowSuccess={() => setIsRowSuccess(true)}
                  />
                ),
              },
            ]}
            paginationModel={{ page: 0, pageSize: 5 }}
            getRowId={(row) => row.companyID}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", paddingTop: 2 }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => setFormModalOpen(true)}
              sx={{ marginBottom: 2 }}
            >
              <Add /> Add Company
            </Button>
          </Box>
        </>
      )}
      {formModalOpen && (
        <Modal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          closeAfterTransition
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={formModalOpen}>
            <Box sx={modalStyle}>
              <CompanyForm
                onSubmit={onSubmit}
                isError={isError}
                isPending={isPending}
                setFormModalOpen={() => setFormModalOpen(false)}
                action={FormAction.CREATE}
              />
            </Box>
          </Fade>
        </Modal>
      )}
      {changeManagerModalOpen && managers && (
        <Modal
          open={changeManagerModalOpen}
          onClose={() => setChangeManagerModalOpen(false)}
          closeAfterTransition
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={changeManagerModalOpen}>
            <Box sx={modalStyle}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Change current manager
              </Typography>
              <Select
                value={selectedManager || currentManager?.managerID}
                onChange={(e) => {
                  const selectedManager = managers?.find(
                    (manager) => manager.managerID === e.target.value
                  );
                  if (selectedManager) {
                    setSelectedManager(selectedManager.managerID);
                  }
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {managers?.map((manager) => (
                  <MenuItem key={manager.managerID} value={manager.managerID}>
                    {`${manager.firstName} ${manager.lastName}`}
                  </MenuItem>
                ))}
              </Select>
              <Button
                color="success"
                onClick={() => setModalOpen(true)}
                sx={{ marginTop: "10px" }}
                variant="contained"
              >
                Submit
              </Button>
              <ConfirmModal
                onClick={(e) => {
                  e!.preventDefault();
                  setModalOpen(false);
                  changeStatus({
                    id: selectedManager,
                    status: "ACTIVE",
                  });
                  const newManager = managers?.find(
                    (manager) => manager.managerID === selectedManager
                  );
                  setCurrentManager(newManager!);
                  setChangeManagerModalOpen(false);
                }}
                modalOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
                buttonColor="success"
              >
                <Typography variant="h6" component="h2">
                  Are you sure you want to update the manager?
                </Typography>
              </ConfirmModal>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default AdminDashboard;
