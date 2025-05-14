import { useChangeCompanyStatus, useEditCompany } from "@/hooks";
import { FormAction, modalStyle } from "@/utils";
import { Button, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useState } from "react";
import CompanyForm from "../CompanyForm";
import { CompanyFormValues } from "@/services/types";
import { ConfirmModal } from "@/components";

type Props = {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  setIsRowSuccess: () => void;
};

const CompanyRow = (props: Props) => {
  const [confirmChange, setConfirmChange] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const { mutate, isError, isPending } = useEditCompany(
    props.params.row.companyID
  );

  const { mutate: mutateChange } = useChangeCompanyStatus(
    props.params.row.companyID
  );

  const onSubmit = (data: CompanyFormValues) => {
    mutate({
      companyName: data.companyName,
      contactEmail: data.contactEmail,
      location: data.location,
    });

    props.setIsRowSuccess();

    setFormModalOpen(false);

    setTimeout(() => {
      props.setIsRowSuccess();
    }, 2000);
  };

  return (
    <>
      <Box sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => setFormModalOpen(true)}
          variant="contained"
          color="warning"
          sx={{ marginRight: 1 }}
        >
          Edit
        </Button>
        <Button
          onClick={() => setConfirmChange(true)}
          variant="contained"
          color="error"
          sx={{ marginRight: 1 }}
        >
          Change Status
        </Button>
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
                  action={FormAction.UPDATE}
                  data={props.params.row}
                />
              </Box>
            </Fade>
          </Modal>
        )}
      </Box>
      {confirmChange && (
        <ConfirmModal
          onClick={(e) => {
            e!.preventDefault();
            setConfirmChange(false);

            const status =
              props.params.row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

            mutateChange(status);
            props.setIsRowSuccess();
            setTimeout(() => {
              props.setIsRowSuccess();
            }, 2000);
          }}
          modalOpen={confirmChange}
          closeModal={() => setConfirmChange(false)}
          buttonColor="success"
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to change this company's status?
          </Typography>
        </ConfirmModal>
      )}
    </>
  );
};

export default CompanyRow;
