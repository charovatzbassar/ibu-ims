import { FallbackCard } from "@/components";
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

  const handleChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number | null
  ) => {
    event?.preventDefault();
    setPage(value ? value : 1);
  };

  const totalPages: number | undefined =
    props.data && Math.ceil(props.data?.length / itemsPerPage);

  return (
    <>
      <Typography variant="h5" sx={{ marginY: "10px" }}>
        My Listings
      </Typography>
      {props.data &&
        props.data.length > 0 &&
        props.data
          .slice(startIndex, endIndex)
          .map((internshipListing: InternshipListing) => (
            <Card key={internshipListing.listingID}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {internshipListing.position} - {internshipListing.location}
                </Typography>
                <Typography variant="body2">
                  {new Date(internshipListing.startDate).toLocaleDateString()} -{" "}
                  {new Date(internshipListing.endDate).toLocaleDateString()}
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
          <FallbackCard content="No active listings." />
        ))}
    </>
  );
};

export default MyListings;
