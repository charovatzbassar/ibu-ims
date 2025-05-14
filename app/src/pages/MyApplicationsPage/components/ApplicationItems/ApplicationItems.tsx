import { useApplicationsForIntern } from "@/hooks";
import React from "react";
import { Application } from "@/services/types";
import {
  Card,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { ApplicationItem } from "..";
import { Box } from "@mui/system";
import {
  CheckCircleOutline,
  HourglassBottom,
  Cancel,
} from "@mui/icons-material";
import { FallbackCard } from "@/components";

type Props = {
  status: string;
};

const Icon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <HourglassBottom color="warning" />;
    case "APPROVED":
      return <CheckCircleOutline color="success" />;
    case "REJECTED":
      return <Cancel color="error" />;
    default:
      return <></>;
  }
};

const ApplicationItems = (props: Props) => {
  const { data, isPending } = useApplicationsForIntern(props.status);
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 4;
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
    data && Math.ceil(data?.length / itemsPerPage);

  return (
    <Box sx={{ marginY: "25px" }}>
      <Card
        sx={{
          padding: "10px",
          fontSize: 25,
          marginY: "10px",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}
      >
        {Icon(props.status)}
        <Typography variant="h6">
          {`${props.status[0]}${props.status.slice(1).toLowerCase()} `}
          applications
        </Typography>
      </Card>
      {isPending && <CircularProgress />}
      {data && data.length === 0 && (
        <FallbackCard
          content={`There are no ${props.status.toLowerCase()} applications.`}
        />
      )}
      {data &&
        !isPending &&
        data.length > 0 &&
        data
          .slice(startIndex, endIndex)
          .map((application: Application) => (
            <ApplicationItem
              key={application.applicationID}
              data={application}
            />
          ))}
      {data && data.length > 0 && (
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
    </Box>
  );
};

export default ApplicationItems;
