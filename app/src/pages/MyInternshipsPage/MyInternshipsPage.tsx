import { useInternships } from "@/hooks";
import { InternshipItem } from "./components";
import {
  Card,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Internship } from "@/services/types";
import React from "react";

const MyInternshipsPage = () => {
  const { data, isPending } = useInternships();

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
    <>
      {!data && isPending && <CircularProgress />}
      {!data && !isPending && (
        <Card sx={{ padding: "20px" }}>An error occured.</Card>
      )}
      {data && data.length === 0 && !isPending && (
        <Card sx={{ padding: "20px" }}>No ongoing internships found.</Card>
      )}
      {data && data.length > 0 && !isPending && (
        <>
          <Typography variant="h5" sx={{ marginY: "10px" }}>
            My Internships
          </Typography>
          {data &&
            data.length !== 0 &&
            data
              .slice(startIndex, endIndex)
              .map((internship: Internship) => (
                <InternshipItem
                  key={internship.internshipID}
                  data={internship}
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
        </>
      )}
    </>
  );
};

export default MyInternshipsPage;
