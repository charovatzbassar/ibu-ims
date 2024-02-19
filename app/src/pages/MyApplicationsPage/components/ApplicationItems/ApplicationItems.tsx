import { useApplicationsForIntern } from "@/hooks";
import React from "react";
import { Application } from "@/services/types";
import {
  Card,
  CircularProgress,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { ApplicationItem } from "..";
import { Box } from "@mui/system";

type Props = {
  status: string;
};

const ApplicationItems = (props: Props) => {
  const { data, isPending } = useApplicationsForIntern(props.status);
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 4;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    data && Math.ceil(data?.length / itemsPerPage);

  return (
    <Box sx={{ marginY: "25px" }}>
      <Card sx={{ padding: "10px", fontSize: 25, marginY: "10px" }}>
        {props.status[0] + props.status.slice(1).toLowerCase()} applications
      </Card>
      {isPending && <CircularProgress />}
      {data && data.length === 0 && (
        <Card sx={{ padding: "10px" }}>
          There are no {props.status.toLowerCase()} applications.
        </Card>
      )}
      {data &&
        !isPending &&
        data
          .slice(startIndex, endIndex)
          .map((application: Application) => (
            <ApplicationItem data={application} />
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
