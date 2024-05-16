import { Intern } from "@/services/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  intern: Intern;
};

const InternItem = (props: Props) => {
  console.log(props.intern);
  return (
    <Card sx={{ padding: "10px", marginY: "10px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.intern?.firstName} {props.intern?.lastName}
        </Typography>
        {props.intern?.internship && (
          <>
            <Divider />
            <Box sx={{ marginY: "10px" }}>
              <Typography variant="body2" color="text.secondary">
                Company: {props.intern?.internship?.company?.companyName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Position:{" "}
                {props.intern?.internship?.internship_listing?.position}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Internship Status:{" "}
                {props.intern?.internship?.status[0] +
                  props.intern?.internship?.status.slice(1).toLowerCase()}
              </Typography>
            </Box>
            <Divider />
            <CardActions>
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                Details
              </Button>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InternItem;
