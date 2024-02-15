import { Internship } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import React from "react";

type Props = {
  data: Internship;
};

const InternshipItem = (props: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default InternshipItem;
