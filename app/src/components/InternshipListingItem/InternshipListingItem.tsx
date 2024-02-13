import { InternshipListing } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  data?: InternshipListing;
};

const InternshipListingItem = (props: Props) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
      key={props.data?.listingID}
    >
      <CardContent>
        <Box sx={{ marginY: "10px" }}>
          <Typography variant="h5" component="div">
            {props.data?.position}
          </Typography>
          <Typography variant="body2">
            {props.data?.company.companyName} - {props.data?.location}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ marginY: "10px" }}>
          <Typography variant="body2">
            From: {new Date(props.data?.startDate || "").toDateString()}
          </Typography>
          <Typography variant="body2">
            To: {new Date(props.data?.endDate || "").toDateString()}
          </Typography>
        </Box>
        <Divider />
        <Typography sx={{ marginY: "10px" }}>
          Available spots: {props.data?.noOfPlaces}
        </Typography>
        <Divider />

        <CardActions>
          <Button color="primary" variant="contained">
            <Link
              to={`/home/internship-listings/${props.data?.listingID}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Details
            </Link>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default InternshipListingItem;
