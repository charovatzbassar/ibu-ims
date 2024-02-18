import {
  useApproveAllInternshipDays,
  useInternship,
  useInternshipDays,
  useModifyInternshipDayStatus,
} from "@/hooks";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Divider,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { InternshipDay } from "@/services/types";
import { InternshipDayItem } from "./components";

const InternshipDetailsPage = () => {
  const { internshipID } = useParams();
  const { data, isPending } = useInternship(internshipID || "");

  const { data: internshipDays, isPending: isDaysPending } = useInternshipDays(
    internshipID || ""
  );

  const { mutate: approveAllInternshipDays } = useApproveAllInternshipDays(
    internshipID || ""
  );

  const { mutate: modifyStatus } = useModifyInternshipDayStatus();

  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 7;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    internshipDays && Math.ceil(internshipDays?.length / itemsPerPage);

  return (
    <>
      {isPending && <CircularProgress />}
      {data && (
        <>
          <Card sx={{ marginY: "10px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.intern?.firstName} {data.intern?.lastName} -{" "}
                {data.internship_listing?.position}
              </Typography>
              <Divider />
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Started at: {data.internship_listing?.startDate.slice(0, 10)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ends at: {data.internship_listing?.endDate.slice(0, 10)}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Link
                to={`/home/my-internships/${internshipID}/report`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" sx={{ margin: "10px" }}>
                  Fill Out Report
                </Button>
              </Link>
            </CardActions>
          </Card>
          <Card sx={{ marginY: "20px" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ marginY: "10px" }}
              >
                Workdays
              </Typography>
              <Divider />
              {isDaysPending && <CircularProgress />}
              {!isDaysPending && (
                <Box sx={{ marginTop: "15px" }}>
                  {internshipDays.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      There are no workdays for this internship.
                    </Typography>
                  )}
                  {internshipDays && internshipDays.length > 0 && (
                    <TableContainer sx={{ marginY: "20px" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {internshipDays
                            ?.slice(startIndex, endIndex)
                            .map((day: InternshipDay) => (
                              <InternshipDayItem
                                key={day.dayID}
                                data={day}
                                modifyStatus={modifyStatus}
                              />
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
              )}
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
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  approveAllInternshipDays();
                }}
              >
                Approve all
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default InternshipDetailsPage;
