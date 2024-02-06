import { InternshipListing } from "@/services/types";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
  Fade,
  Box,
  Modal,
  Backdrop,
} from "@mui/material";
import React from "react";
import { modalStyle } from "@/utils";
import { Link } from "react-router-dom";

type Props = {
  data?: InternshipListing;
  isOwner: boolean;
  onDelete: () => void;
};

const InternshipListingContent = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);


  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Are you sure you want to delete this listing?
            </Typography>

            <Button
              sx={{ marginTop: "10px" }}
              variant="contained"
              color="error"
              onClick={() => {
                setModalOpen(false);
                props.onDelete();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Fade>
      </Modal>
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
