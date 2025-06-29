import React from "react";
import { useInternshipListingsByCompany } from "@/hooks";
import { ErrorAlert, FallbackCard, InternshipListingItem } from "@/components";
import {
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
        <FallbackCard content="No Active Listings Found. Start by creating a listing!" />
      )}
    </>
  );
};

export default MyListingsPage;
