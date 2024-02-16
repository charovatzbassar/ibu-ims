import { useInternships } from "@/hooks";
import { InternshipItem } from "./components";
import { Pagination, PaginationItem, Typography } from "@mui/material";
import { Internship } from "@/services/types";
import React from "react";

const MyInternshipsPage = () => {
  const { data } = useInternships();

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
    <>
      {data?.length === 0 ? (
        <Typography>No internships found.</Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ marginY: "10px" }}>
            My Internships
          </Typography>
          <div>
            {data &&
              data.length !== 0 &&
              data
                ?.slice(startIndex, endIndex)
                .map((internship: Internship) => (
                  <InternshipItem
                    key={internship.internshipID}
                    data={internship}
                  />
                ))}

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
        </>
      )}
    </>
  );
};

export default MyInternshipsPage;
