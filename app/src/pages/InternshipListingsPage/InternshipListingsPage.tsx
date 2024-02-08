import { useInternshipListings } from "@/hooks";
import React from "react";
import {
  CircularProgress,
  IconButton,
  Pagination,
  PaginationItem,
  InputBase,
  Typography,
} from "@mui/material";
import { InternshipListingItem } from "@/components";
import { Search } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { queryClient } from "@/utils";

const InternshipListingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useInternshipListings(
    searchParams.get("searchTerm") || ""
  );
  const [page, setPage] = React.useState<number>(1);
  const { register, handleSubmit } = useForm();

  const itemsPerPage: number = 5;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    data && Math.ceil(data?.length / itemsPerPage);

  const onSearch = (data) => {
    setSearchParams({ searchTerm: data.searchTerm });
    queryClient.invalidateQueries({
      queryKey: ["internship-listings", data.searchTerm],
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSearch)}
        style={{
          padding: "2px 4px",
          margin: "10px",
          display: "flex",
          alignItems: "center",
          width: 400,
          backgroundColor: "white",
          borderRadius: "0.3em",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Listings"
          inputProps={{ "aria-label": "search listings" }}
          {...register("searchTerm")}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </form>
      {!isPending && data && data.length === 0 && (
        <Typography sx={{ margin: "10px" }}>No Listings Found.</Typography>
      )}
      {isPending && <CircularProgress />}
      {data && data.length !== 0 && (
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

export default InternshipListingsPage;
