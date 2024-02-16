import { useCreateInternshipDay, useInternshipForIntern } from "@/hooks";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { InternshipDayForm } from "./components";

const MyInternshipPage = () => {
  const { data, isPending } = useInternshipForIntern();

  const { mutate, onSuccess } = useCreateInternshipDay(data.internshipID);

  return (
    <>
      {isPending && <CircularProgress />}
      {data && (
        <>
          <Card sx={{ marginY: "10px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
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
          </Card>
          <InternshipDayForm
            onSubmit={(data) => {
              mutate(data.description);
            }}
          />
        </>
      )}
    </>
  );
};

export default MyInternshipPage;
