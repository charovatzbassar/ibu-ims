import { Internship } from "@/services/types";
import { Card, CardContent, Divider, Typography } from "@mui/material";

type Props = {
  data: Internship;
};

const MyInternship = (props: Props) => {
  return (
    <Card sx={{ padding: "20px" }}>
      {!props.data && (
        <Typography sx={{ fontSize: 20 }}>
          No ongoing internship found.
        </Typography>
      )}
      {props.data && (
        <>
          <Typography sx={{ margin: "10px", fontSize: 20 }}>
            My Internship
          </Typography>
          <Divider />
          <CardContent>
            <Typography variant="h5" component="div">
              {props.data.intern?.firstName} {props.data.intern?.lastName} -{" "}
              {props.data.internship_listing?.position}
            </Typography>
            <Typography variant="body2">
              {new Date(props.data.internship_listing?.startDate || "").toDateString()}{" "}
              - {new Date(props.data.internship_listing?.endDate || "").toDateString()}
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default MyInternship;
