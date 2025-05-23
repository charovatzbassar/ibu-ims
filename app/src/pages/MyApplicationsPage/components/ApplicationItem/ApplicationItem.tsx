import { Application } from "@/services/types";
import { Card, CardContent, Typography } from "@mui/material";

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
          Location: {props.data.internship_listing.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Starts at:{" "}
          {new Date(props.data.internship_listing.startDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ends at:{" "}
          {new Date(props.data.internship_listing.endDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ApplicationItem;
