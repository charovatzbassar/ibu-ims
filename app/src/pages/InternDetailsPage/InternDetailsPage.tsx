import { useIntern } from "@/hooks";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Days } from "@/components";

const InternDetailsPage = () => {
  const { internID } = useParams();

  const { data: intern, isPending } = useIntern(internID || "");

  return (
    <>
      {isPending && <CircularProgress />}
      {intern && !isPending && (
        <>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {intern?.firstName} {intern?.lastName}
              </Typography>
              <Divider />
              <Box sx={{ marginY: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Company: {intern?.internship?.company?.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position: {intern?.internship?.internship_listing?.position}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Start Date:{" "}
                  {new Date(
                    intern?.internship?.internship_listing?.startDate
                  ).toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  End Date:{" "}
                  {new Date(
                    intern?.internship?.internship_listing?.endDate
                  ).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  {intern?.internship?.status[0] +
                    intern?.internship?.status.slice(1).toLowerCase()}
                </Typography>
              </Box>
              <Divider />
              {intern?.internship?.final_grade?.grade ? (
                <Box
                  sx={{
                    marginY: "10px",
                  }}
                >
                  <Typography sx={{ marginY: "10px" }}>
                    Grade: {intern?.internship?.final_grade?.grade}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    marginY: "10px",
                  }}
                >
                  <Typography sx={{ marginY: "10px" }}>
                    The intern has not been graded yet.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Days days={intern?.internship?.internship_day || []} />

          {!intern?.internship?.final_grade?.grade && (
            <Card sx={{ marginY: "10px" }}>
              <Typography sx={{ padding: "10px", fontSize: 20 }}>
                Final Report
              </Typography>
              <Divider />
              {!intern?.internship?.internship_report?.finalReport && (
                <Typography sx={{ margin: "10px" }}>
                  There is no final report.
                </Typography>
              )}
              {intern?.internship?.internship_report?.finalReport && (
                <>
                  <Typography sx={{ margin: "10px" }}>
                    {intern?.internship?.internship_report?.finalReport}
                  </Typography>
                </>
              )}
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default InternDetailsPage;
