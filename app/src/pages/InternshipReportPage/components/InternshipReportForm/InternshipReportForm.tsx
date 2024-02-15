import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: { finalReport: string }) => void;
};

const InternshipReportForm = (props: Props) => {
  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Card sx={{ padding: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("finalReport", {
            required: "You must fill out the final report.",
            maxLength: {
              value: 250,
              message: "The final report must not exceed 250 characters.",
            },
          })}
          id="outlined-multiline-static"
          label="Write your report here"
          multiline
          fullWidth
          error={!!errors.finalReport}
          helperText={errors.finalReport && errors.finalReport.message}
          rows={15}
        />
        <Button type="submit" variant="contained" sx={{ margin: "10px" }}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default InternshipReportForm;
