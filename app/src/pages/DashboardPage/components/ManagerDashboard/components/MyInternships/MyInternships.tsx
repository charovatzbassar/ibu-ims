import { Intern } from "@/services/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  interns: Intern[];
};

const MyInternships = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const itemsPerPage: number = 1;
  const startIndex: number = (page - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const totalPages: number | undefined =
    props.interns && Math.ceil(props.interns?.length / itemsPerPage);

  return (
    <>
      <Typography variant="h5" sx={{ marginY: "10px" }}>
        My Students
      </Typography>

      {props.interns &&
        props.interns.slice(startIndex, endIndex).map((intern: Intern) => (
          <Card key={intern.internID} sx={{ padding: "10px", marginY: "10px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {intern?.firstName} {intern?.lastName}
              </Typography>
              <Divider />
              <Box sx={{ marginY: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Company: {intern?.internship?.company?.companyName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Position: {intern?.internship?.internship_listing?.position}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Internship Status:{" "}
                  {intern?.internship?.status[0] +
                    intern?.internship?.status.slice(1).toLowerCase()}
                </Typography>
              </Box>
              <Divider />
            </CardContent>
          </Card>
        ))}

      {props.interns && props.interns.length > 0 && (
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
    </>
  );
};

export default MyInternships;
