import { useAllInternshipDays, useInternshipForIntern } from "@/hooks";
import { InternshipDay } from "@/services/types";
import {
  Cancel,
  CheckCircleOutline,
  HourglassBottom,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const getStatusContent = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <>
          <HourglassBottom color="warning" />
          Pending approval.
        </>
      );

    case "APPROVED":
      return (
        <>
          <CheckCircleOutline color="success" />
          Approved!
        </>
      );

    case "REJECTED":
      return (
        <>
          <Cancel color="error" />
          Rejected.
        </>
      );

    default:
      return null;
  }
};

const DayReportsPage = () => {
  const { data: internship } = useInternshipForIntern();
  const { data: days } = useAllInternshipDays(internship?.internshipID || "");

  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 5;
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
    days && Math.ceil(days?.length / itemsPerPage);

  return (
    <>
      {days && days.length !== 0 && (
        <div>
          {days
            .slice(startIndex, endIndex)
            .map((internshipDay: InternshipDay) => {
              return (
                <Card
                  sx={{
                    minWidth: 275,
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                  key={internshipDay?.dayID}
                >
                  <CardContent>
                    <Box sx={{ marginY: "10px" }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ display: "flex", marginY: "10px" }}
                      >
                        {new Date(internshipDay?.workdayDate).toDateString()}
                      </Typography>
                      <Divider />

                      <Typography
                        variant="body2"
                        sx={{ display: "flex", marginY: "10px" }}
                      >
                        {internshipDay?.dayDescription}{" "}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          marginY: "10px",
                          alignItems: "center",
                          marginX: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {getStatusContent(internshipDay?.status || "")}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}

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
        </div>
      )}
    </>
  );
};

export default DayReportsPage;
