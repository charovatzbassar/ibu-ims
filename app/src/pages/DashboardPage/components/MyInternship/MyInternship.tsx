import { FallbackCard } from "@/components";
import { Internship } from "@/services/types";
import { Card, CardContent, Divider, Typography } from "@mui/material";

type Props = {
  data: Internship;
};

const MyInternship = (props: Props) => {
  return (
    <>
      {props.data && (
        <Card sx={{ padding: "20px" }}>
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
              {new Date(
                props.data.internship_listing?.startDate || ""
              ).toLocaleDateString()}{" "}
              -{" "}
              {new Date(
                props.data.internship_listing?.endDate || ""
              ).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      )}
      {!props.data && <FallbackCard content="No ongoing internship found." />}
    </>
  );
};

export default MyInternship;
