import React from "react";
import { useInternshipListingsByCompany } from "@/hooks";
import { ErrorAlert, InternshipListingItem } from "@/components";
import {
  Card,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";

const MyListingsPage = () => {
  const { data, isPending, isError } = useInternshipListingsByCompany();
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 5;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    data && Math.ceil(data?.length / itemsPerPage);

  return (
    <>
      {isPending && <CircularProgress />}
      {isError && <ErrorAlert />}
      {data && data.length !== 0 && !isPending && (
        <div>
          <Typography sx={{ marginY: "10px", fontSize: 25 }}>
            My Listings
          </Typography>
          {data.slice(startIndex, endIndex).map((internshipListing) => {
            return (
              <InternshipListingItem
                key={internshipListing.listingID}
                data={internshipListing}
              />
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
      {data && data.length === 0 && (
        <div>
          <Card sx={{ padding: "20px" }}>
            No Active Listings Found. Start by creating a listing!
          </Card>
        </div>
      )}
    </>
  );
};

export default MyListingsPage;
