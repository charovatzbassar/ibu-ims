import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: { description: string }) => void;
};

const InternshipDayForm = (props: Props) => {
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
          {...register("description", {
            required: "You must fill out the description.",
          })}
          id="outlined-multiline-static"
          label={`Write your day description here`}
          multiline
          fullWidth
          error={!!errors.finalReport}
          helperText={errors.description && errors.description.message}
          rows={15}
        />
        <Button type="submit" variant="contained" sx={{ margin: "10px" }}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default InternshipDayForm;
