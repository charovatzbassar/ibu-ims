import { FallbackCard } from "@/components";
import { Internship } from "@/services/types";
import {
  Card,
  CardContent,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {
  data: Internship[];
};

const Internships = (props: Props) => {
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
    <Box sx={{ paddingBottom: 2 }}>
      <Typography variant="h5" sx={{ marginY: "10px" }}>
        My Internships
      </Typography>
      {props.data &&
        props.data.length > 0 &&
        props.data.slice(startIndex, endIndex).map((internship: Internship) => (
          <Card key={internship.internshipID}>
            <CardContent>
              <Typography variant="h5" component="div">
                {internship.intern?.firstName} {internship.intern?.lastName} -{" "}
                {internship.internship_listing?.position}
              </Typography>
              <Typography variant="body2">
                {new Date(
                  internship.internship_listing?.startDate || ""
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  internship.internship_listing?.endDate || ""
                ).toLocaleDateString()}
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
          <FallbackCard content="No ongoing internships." />
        ))}
    </Box>
  );
};

export default Internships;
