import { InternshipDay } from "@/services/types";
import {
  Cancel,
  CheckCircleOutline,
  HourglassBottom,
} from "@mui/icons-material";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  data: InternshipDay;
}

const getStatusContent = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <>
          <HourglassBottom color="warning" />
          Pending approval.
        </>
      );

    case "APPROVED":
      return (
        <>
          <CheckCircleOutline color="success" />
          Approved!
        </>
      );

    case "REJECTED":
      return (
        <>
          <Cancel color="error" />
          Rejected.
        </>
      );

    default:
      return null;
  }
};

const InternshipDayItem = (props: Props) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <CardContent>
        <Box sx={{ marginY: "10px" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: "flex", marginY: "10px" }}
          >
            {new Date(props.data.workdayDate || "").toDateString()}
          </Typography>
          <Divider />

          <Typography variant="body2" sx={{ display: "flex", marginY: "10px" }}>
            {props.data.dayDescription}{" "}
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              marginY: "10px",
              alignItems: "center",
              marginX: 1,
              fontWeight: "bold",
            }}
          >
            {getStatusContent(props.data.status || "")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InternshipDayItem;
