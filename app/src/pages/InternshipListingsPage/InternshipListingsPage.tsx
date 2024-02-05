import { useInternshipListings } from "@/hooks";
import React from "react";
import {
  CircularProgress,
  Pagination,
  PaginationItem,
  Box,
} from "@mui/material";
import { InternshipListingItem } from "./components";

const InternshipListingsPage: React.FC = () => {
  const { data, isPending } = useInternshipListings();
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChange = (value: number) => {
    setPage(value);
  };

  const totalPages = data && Math.ceil(data?.length / itemsPerPage);

  return (
    <>
      {isPending && <CircularProgress />}
      {data && (
        <div>
          {data.slice(startIndex, endIndex).map((internshipListing) => {
            return (
              <InternshipListingItem
                key={internshipListing.listingID}
                data={internshipListing}
              />
            );
          })}

          <Pagination
            sx={{ marginY: 2 }}
            count={totalPages}
            page={page}
            color="primary"
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                component="button"
                {...item}
                onClick={() => handleChange(item.page || 1)}
              />
            )}
          />
        </div>
      )}
    </>
  );
};

export default InternshipListingsPage;
