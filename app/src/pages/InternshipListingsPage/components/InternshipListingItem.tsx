import { InternshipListing } from "@/services/types";
import { Card, CardContent, Typography } from "@mui/material";
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
        <img
          src={`data:image/jpeg;base64,${props.data?.company.companyLogo?.toString()}`}
          alt="Company Logo"
        />
        <Typography variant="h5" component="div">
          <Link to={`/home/internship-listings/${props.data?.listingID}`}>
            {props.data?.position}
          </Link>
        </Typography>
        <Typography variant="body2">
          {props.data?.company.companyName} - {props.data?.location}
        </Typography>
        <Typography variant="body2">
          From: {new Date(props.data?.startDate || "").toDateString()}
        </Typography>
        <Typography variant="body2">
          To: {new Date(props.data?.endDate || "").toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InternshipListingItem;
