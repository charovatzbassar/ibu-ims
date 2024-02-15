import { useInternship } from "@/hooks";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Divider,
  Box,
} from "@mui/material";

const InternshipDetailsPage = () => {
  const { internshipID } = useParams();
  const { data, isPending } = useInternship(internshipID || "");

  return (
    <>
      {isPending && <CircularProgress />}
      {data && (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.intern.firstName} {data.intern.lastName} -{" "}
              {data.internship_listing.position}
            </Typography>
            <Divider />
            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="body2" color="text.secondary">
                Started at: {data.internship_listing.startDate.slice(0, 10)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ends at: {data.internship_listing.endDate.slice(0, 10)}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Link
              to={`/home/my-internships/${internshipID}/report`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="contained" sx={{ margin: "10px" }}>
                Fill Out Report
              </Button>
            </Link>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default InternshipDetailsPage;
