import { Application } from "@/services/types";
import { CheckCircleOutline } from "@mui/icons-material";
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

type Props = {
  data: Application[];
};

const ApprovedApplications = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 1;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown> | null, value: number | null) => {
    event?.preventDefault();
    setPage(value ? value : 1);
  };

  const totalPages: number | undefined =
    props.data && Math.ceil(props.data?.length / itemsPerPage);

  return (
    <Box sx={{ marginY: "10px" }}>
      {props.data &&
        props.data.length > 0 &&
        props.data
          .slice(startIndex, endIndex)
          .map((application: Application) => (
            <Card>
              <Typography sx={{ padding: "10px", fontSize: 20 }}>
                <CheckCircleOutline color="success" /> Approved Applications
              </Typography>
              <Divider />
              <CardContent>
                <Typography variant="h5" component="div">
                  {application.internship_listing.position} -{" "}
                  {application.internship_listing.location}{" "}
                </Typography>
                <Typography variant="body2">
                  {new Date(
                    application.internship_listing.startDate
                  ).toDateString()}{" "}
                  -{" "}
                  {new Date(
                    application.internship_listing.endDate
                  ).toDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}

      {props.data && props.data.length > 0 && (
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
      )}
      {!props.data ||
        (props.data.length === 0 && (
          <Card sx={{ fontSize: 20, marginY: "10px", padding: "20px" }}>
            No approved applications.
          </Card>
        ))}
    </Box>
  );
};

export default ApprovedApplications;
