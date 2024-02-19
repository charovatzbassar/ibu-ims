import { Application } from "@/services/types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  data: Application;
};

const ApplicationItem = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.internship_listing.position} -{" "}
          {props.data.internship_listing.company.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {props.data.internship_listing.company.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Starts at:{" "}
          {new Date(props.data.internship_listing.startDate).toDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ends at:{" "}
          {new Date(props.data.internship_listing.endDate).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicationItem;
