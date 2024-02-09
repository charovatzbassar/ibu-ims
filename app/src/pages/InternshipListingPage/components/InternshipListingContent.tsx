import { InternshipListing } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "@/components";

type Props = {
  data?: InternshipListing;
  isOwner: boolean;
  onDelete: () => void;
};

const InternshipListingContent = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <>
      <ConfirmModal
        onClick={() => {
          setModalOpen(false);
          props.onDelete();
        }}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        buttonColor="error"
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to delete this listing?
        </Typography>
        <Typography
          variant="h6"
          component="h4"
          sx={{ fontSize: 15, color: "gray" }}
        >
          This action cannot be undone.
        </Typography>
      </ConfirmModal>

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
            <Typography sx={{ marginY: "10px" }}>
              {props.data?.listingDescription}
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
          <Box>
            <Typography sx={{ marginY: "10px" }}>
              Available spots: {props.data?.noOfPlaces}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography sx={{ marginTop: "10px" }}>
              Requirements: {props.data?.requirements}
            </Typography>
          </Box>
        </CardContent>
        {props.isOwner && (
          <>
            <Divider />
            <CardActions sx={{ margin: "10px" }}>
              <Button variant="contained" color="warning">
                <Link
                  to={`/home/internship-listings/${props.data?.listingID}/edit`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Edit
                </Link>
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setModalOpen(true)}
              >
                Delete
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
};

export default InternshipListingContent;
