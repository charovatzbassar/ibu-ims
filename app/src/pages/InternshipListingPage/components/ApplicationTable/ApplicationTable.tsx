import { ConfirmModal } from "@/components";
import { Application } from "@/services/types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Pagination,
  PaginationItem,
  Divider,
} from "@mui/material";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

type Props = {
  data: Application[];
  modifyHook?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    { applicationID: string; status: string },
    unknown
  >;
};

const ApplicationTable = (props: Props) => {
  const [approveModalOpen, setApproveModalOpen] =
    React.useState<boolean>(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 4;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    props.data && Math.ceil(props.data?.length / itemsPerPage);

  return (
    <>
      <TableContainer component={Paper} sx={{ marginY: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              {props.data[0].applicationStatus === "PENDING" && (
                <TableCell align="left">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.slice(startIndex, endIndex).map((application) => (
              <TableRow
                key={application.applicationID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {application.intern.firstName}
                </TableCell>
                <TableCell align="left">
                  {application.intern.lastName}
                </TableCell>
                <TableCell align="left">{application.intern.email}</TableCell>
                {application.applicationStatus === "PENDING" && (
                  <TableCell align="left">
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ margin: "5px" }}
                      onClick={() => setApproveModalOpen(true)}
                    >
                      Approve
                    </Button>
                    <ConfirmModal
                      buttonColor="success"
                      modalOpen={approveModalOpen}
                      closeModal={() => setApproveModalOpen(false)}
                      onClick={() => {
                        setApproveModalOpen(false);
                        props.modifyHook?.mutate({
                          applicationID: application.applicationID,
                          status: "APPROVED",
                        });
                      }}
                    >
                      Are you sure you want to approve this application?
                    </ConfirmModal>
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ margin: "5px" }}
                      onClick={() => setRejectModalOpen(true)}
                    >
                      Reject
                    </Button>
                    <ConfirmModal
                      buttonColor="error"
                      modalOpen={rejectModalOpen}
                      closeModal={() => setRejectModalOpen(false)}
                      onClick={() => {
                        setRejectModalOpen(false);
                        props.modifyHook?.mutate({
                          applicationID: application.applicationID,
                          status: "REJECTED",
                        });
                      }}
                    >
                      Are you sure you want to reject this application?
                    </ConfirmModal>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <Pagination
          sx={{
            marginY: 2,
            display: "flex",
            justifyContent: "center",
          }}
          count={totalPages}
          page={page}
          color="primary"
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              component="button"
              {...item}
              onClick={() => handleChange(null, item.page)}
            />
          )}
        />
      </TableContainer>
    </>
  );
};

export default ApplicationTable;
