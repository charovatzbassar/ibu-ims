import { InternshipListing } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

type Props = {
  data?: InternshipListing;
  isOwner: boolean;
};

const InternshipListingContent = (props: Props) => {
  return (
    <>
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
          <Typography variant="h5" component="div">
            {props.data?.position}
          </Typography>
          <Typography variant="body2">
            {props.data?.company.companyName} - {props.data?.location}
          </Typography>
          <Divider />
          <Typography sx={{ marginY: "10px" }}>
            {props.data?.listingDescription}
          </Typography>
          <Divider />

          <Typography variant="body2">
            From: {new Date(props.data?.startDate || "").toDateString()}
          </Typography>
          <Typography variant="body2">
            To: {new Date(props.data?.endDate || "").toDateString()}
          </Typography>
          <Divider />
        </CardContent>
        {props.isOwner && (
          <CardActions>
            <Button variant="contained" color="warning">
              Edit
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default InternshipListingContent;
