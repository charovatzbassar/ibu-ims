import { Internship } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

type Props = {
  data: Internship;
};

const InternshipItem = (props: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.intern.firstName} {props.data.intern.lastName} -{" "}
          {props.data.internship_listing.position}
        </Typography>
        <Divider />
        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="body2" color="text.secondary">
            Started at: {props.data.internship_listing.startDate.slice(0, 10)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ends at: {props.data.internship_listing.endDate.slice(0, 10)}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant="contained" sx={{ margin: "10px" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default InternshipItem;
