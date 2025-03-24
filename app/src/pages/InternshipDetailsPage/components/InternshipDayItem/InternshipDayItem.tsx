import { ConfirmModal } from "@/components";
import { InternshipDay } from "@/services/types";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

type Props = {
  data: InternshipDay;
  modifyStatus: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    { dayID: string; status: string },
    unknown
  >;
};

const InternshipDayItem = (props: Props) => {
  const [approveModalOpen, setApproveModalOpen] =
    React.useState<boolean>(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState<boolean>(false);
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {new Date(props.data.workdayDate).toLocaleDateString()}
        </TableCell>
        <TableCell align="left">{props.data.dayDescription}</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            color="success"
            sx={{ marginX: "10px" }}
            onClick={() => setApproveModalOpen(true)}
          >
            APPROVE
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginX: "10px" }}
            onClick={() => setRejectModalOpen(true)}
          >
            REJECT
          </Button>
        </TableCell>
      </TableRow>

      <ConfirmModal
        onClick={() => {
          setApproveModalOpen(false);
          props.modifyStatus({
            dayID: props.data.dayID,
            status: "APPROVED",
          });
        }}
        modalOpen={approveModalOpen}
        closeModal={() => setApproveModalOpen(false)}
        buttonColor="success"
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to approve this day?
        </Typography>
      </ConfirmModal>

      <ConfirmModal
        onClick={() => {
          setRejectModalOpen(false);
          props.modifyStatus({
            dayID: props.data.dayID,
            status: "REJECTED",
          });
        }}
        modalOpen={rejectModalOpen}
        closeModal={() => setRejectModalOpen(false)}
        buttonColor="error"
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to reject this day?
        </Typography>
      </ConfirmModal>
    </>
  );
};

export default InternshipDayItem;
