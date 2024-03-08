import { ConfirmModal } from "@/components";
import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: { finalReport?: string }) => void;
  internFullName: string;
};

const InternshipReportForm = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<{ finalReport: string }>();

  return (
    <Card sx={{ padding: "25px" }}>
      <Typography variant="h5" gutterBottom sx={{ marginY: "10px" }}>
        Final Report for {props.internFullName}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("finalReport", {
            required: "You must fill out the final report.",
            maxLength: {
              value: 250,
              message: "The final report must not exceed 250 characters.",
            },
          })}
          label="Write your report here"
          multiline
          fullWidth
          error={!!errors.finalReport}
          helperText={errors.finalReport && errors.finalReport.message}
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
            Are you sure you want to submit this report?
          </Typography>
          <Typography sx={{ color: "grey", fontSize: 15 }}>
            This will end the internship.{" "}
          </Typography>
        </ConfirmModal>
      </form>
    </Card>
  );
};

export default InternshipReportForm;
