import { modalStyle } from "@/utils";
import { Modal, Box, Fade, Button, Backdrop } from "@mui/material";
import { FormEvent } from "react";

type Props = {
  children: React.ReactNode;
  onClick: (e?: FormEvent) => void;
  modalOpen: boolean;
  closeModal: () => void;
  buttonColor:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
};

const ConfirmModal = (props: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.modalOpen}
      onClose={props.closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.modalOpen}>
        <Box sx={modalStyle}>
          {props.children}
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            color={props.buttonColor}
            onClick={props.onClick}
          >
            Confirm
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
