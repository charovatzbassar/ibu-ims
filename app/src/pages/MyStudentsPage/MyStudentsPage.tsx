import React from "react";
import { useInterns } from "@/hooks";
import { InternItem } from "./components";
import { Box } from "@mui/system";
import { Intern } from "@/services/types";
import {
  Card,
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "@/utils";
import { Search } from "@mui/icons-material";

const MyStudentsPage = () => {
  const [page, setPage] = React.useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useInterns(
    searchParams.get("searchTerm") || "",
    searchParams.get("searchStatus") || ""
  );

  const { register, handleSubmit, control } = useForm();

  const itemsPerPage: number = 5;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    data && Math.ceil(data?.length / itemsPerPage);

  const onSearch = (data) => {
    setSearchParams({
      searchTerm: data.searchTerm,
      searchStatus: data.searchStatus,
    });
    queryClient.invalidateQueries({
      queryKey: ["interns", data.searchTerm, data.searchStatus],
    });
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSearch)}
        style={{
          marginTop: "10px",
          borderRadius: "0.3em",
        }}
      >
        <Card
          sx={{
            display: "flex",
            marginBottom: "10px",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "0.3em",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Interns By Company"
            {...register("searchTerm")}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Card>
        <FormControl fullWidth sx={{ backgroundColor: "white" }}>
          <InputLabel id="statusLabel">Status</InputLabel>
          <Controller
            name="searchStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} labelId="statusLabel" label="Status">
                <MenuItem value="ONGOING">Ongoing</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </Select>
            )}
          />
        </FormControl>
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
