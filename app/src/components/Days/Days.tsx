import { InternshipDay } from "@/services/types";
import {
  Card,
  Pagination,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {
  days: InternshipDay[];
};

const Days = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 7;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number | null
  ) => {
    event?.preventDefault();
    setPage(value ? value : 1);
  };

  const totalPages: number | undefined =
    props.days && Math.ceil(props.days?.length / itemsPerPage);

  return (
    <Card sx={{ marginY: "10px", padding: "10px" }}>
      <Typography sx={{ padding: "10px", fontSize: 20 }}>Workdays</Typography>
      <Box sx={{ marginTop: "15px" }}>
        {props.days.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginY: "10px" }}
          >
            There are no workdays for this internship.
          </Typography>
        )}
        {props.days && props.days.length > 0 ? (
          <>
            <TableContainer sx={{ marginY: "20px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.days
                    .slice(startIndex, endIndex)
                    .map((day: InternshipDay) => (
                      <TableRow key={day.dayID}>
                        <TableCell component="th" scope="row">
                          {new Date(day.workdayDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="left">{day.dayDescription}</TableCell>
                        <TableCell align="left">
                          {day.status[0] + day.status.slice(1).toLowerCase()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              sx={{ marginY: 2, display: "flex", justifyContent: "center" }}
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
          </>
        ) : (
          <Typography>There are no internship days.</Typography>
        )}
      </Box>
    </Card>
  );
};

export default Days;
