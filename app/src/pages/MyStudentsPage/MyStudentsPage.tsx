import React from "react";
import { useInterns } from "@/hooks";
import { InternItem } from "./components";
import { Box } from "@mui/system";
import { Intern } from "@/services/types";
import {
  Card,
  CircularProgress,
  IconButton,
  InputBase,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "@/utils";
import { Search } from "@mui/icons-material";

const MyStudentsPage = () => {
  const [page, setPage] = React.useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useInterns(searchParams.get("searchTerm") || "");

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
      queryKey: ["interns", data.searchTerm],
    });
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSearch)}
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          width: 400,
          backgroundColor: "white",
          borderRadius: "0.3em",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Interns By Company Name"
          inputProps={{ "aria-label": "search interns by company" }}
          {...register("searchTerm")}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </form>
      {isPending && <CircularProgress />}
      {data && data.length === 0 && !isPending && (
        <Card sx={{ padding: "10px", marginY: "10px" }}>No interns found</Card>
      )}
      {data && data.length > 0 && !isPending && (
        <>
          {data.slice(startIndex, endIndex).map((intern: Intern) => (
            <InternItem key={intern.internID} intern={intern} />
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
        </>
      )}
    </Box>
  );
};

export default MyStudentsPage;
