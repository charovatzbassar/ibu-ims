import { InternshipListing } from "@/services/types";
import {
  Card,
  CardContent,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  data: InternshipListing[];
};

const MyListings = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 1;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    props.data && Math.ceil(props.data?.length / itemsPerPage);

  return (
    <>
      <Typography sx={{ fontSize: 20, marginY: "10px" }}>
        My Listings
      </Typography>
      {props.data &&
        props.data.length > 0 &&
        props.data
          .slice(startIndex, endIndex)
          .map((internshipListing: InternshipListing) => (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {internshipListing.position}
                  {internshipListing.location}
                </Typography>
                <Typography variant="body2">
                  {new Date(internshipListing.startDate).toDateString()} -{" "}
                  {new Date(internshipListing.endDate).toDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}

      {props.data && props.data.length > 0 && (
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
      {!props.data ||
        (props.data.length === 0 && (
          <Card sx={{ fontSize: 20, marginY: "10px", padding: "20px" }}>
            No active listings.
          </Card>
        ))}
    </>
  );
};

export default MyListings;
