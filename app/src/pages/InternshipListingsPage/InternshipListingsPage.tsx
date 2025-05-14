import { useInternshipListings } from "@/hooks";
import React from "react";
import {
  CircularProgress,
  IconButton,
  Pagination,
  PaginationItem,
  InputBase,
  Card,
} from "@mui/material";
import { FallbackCard, InternshipListingItem } from "@/components";
import { Search } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { queryClient } from "@/services";

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

  const handleChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number | null
  ) => {
    event?.preventDefault();
    setPage(value ? value : 1);
  };

  const totalPages: number | undefined =
    data && Math.ceil(data?.length / itemsPerPage);

  const onSearch: SubmitHandler<FieldValues> = (data) => {
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
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: "0.3em",
        }}
      >
        <Card>
          <InputBase
            sx={{ ml: 1 }}
            placeholder="Search Listings"
            inputProps={{ "aria-label": "search listings" }}
            {...register("searchTerm")}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Card>
      </form>
      {!isPending && data && data.length === 0 && (
        <FallbackCard content="No listings found." />
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
