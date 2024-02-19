import { ConfirmModal } from "@/components";
import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: { description: string }) => void;
};

const InternshipDayForm = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm();
  return (
    <Card sx={{ padding: "20px" }}>
      <Typography sx={{ marginY: "15px", fontSize: 20 }}>
        Today's Date: {new Date().toDateString()}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("description", {
            required: "You must fill out the description.",
          })}
          id="outlined-multiline-static"
          label={`Write your day description here`}
          multiline
          fullWidth
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          rows={15}
        />
        <Button
          onClick={isValid ? () => setModalOpen(true) : () => trigger()}
          variant="contained"
          sx={{ marginY: "10px" }}
        >
          Submit
        </Button>
        <ConfirmModal
          onClick={(e) => {
            e!.preventDefault();
            setModalOpen(false);
            handleSubmit(onSubmit)();
          }}
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          buttonColor="success"
        >
          <Typography variant="h6" component="h2">
            Are you sure you want to submit this day report?
          </Typography>
        </ConfirmModal>
      </form>
    </Card>
  );
};

export default InternshipDayForm;
